from django.core.exceptions import ValidationError
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Room
from .serializers import CreateRoomSerializer, RoomSerializer

SESSION_ROOM_CODE = 'room_code'


class ListRoomsView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoomView(APIView):
    serializer_class = RoomSerializer

    def get(self, request, code):
        if code:
            try:
                room = Room.objects.filter(code=code)
            except ValidationError as e:
                return Response({'Invalid': '; '.join(e.messages)}, status.HTTP_400_BAD_REQUEST)

            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host

                return Response(data, status=status.HTTP_200_OK)
            return Response({'Invalid': 'Room code not found.'}, status.HTTP_404_NOT_FOUND)
        return Response({'Invalid': 'Room code not provided.'}, status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request):
        # Check user has an active session, create one if not
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data['guest_can_pause']
            votes_to_skip = serializer.data['votes_to_skip']
            host = self.request.session.session_key

            # Upsert: If user (session) already has a room, update settings, otherwise create
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            else:
                room = Room(
                    host=host,
                    guest_can_pause=guest_can_pause,
                    votes_to_skip=votes_to_skip,
                )
                room.save()

            # Set room code in user session
            self.request.session[SESSION_ROOM_CODE] = room.code

            return Response(
                data=RoomSerializer(room).data,
                status=status.HTTP_201_CREATED,
            )
        return Response({'Invalid': 'Bad data.'}, status.HTTP_400_BAD_REQUEST)


class JoinRoomView(APIView):
    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get('code')
        if code:
            try:
                queryset = Room.objects.filter(code=code)
            except ValidationError as e:
                return Response({'Invalid': '; '.join(e.messages)}, status.HTTP_400_BAD_REQUEST)

            if queryset.exists():
                # Set room code in user session
                self.request.session[SESSION_ROOM_CODE] = code

                return Response({'Message': 'Room joined'}, status=status.HTTP_200_OK)
            return Response({'Invalid': 'Room code not found.'}, status.HTTP_404_NOT_FOUND)
        return Response({'Invalid': 'Room code not provided.'}, status.HTTP_400_BAD_REQUEST)


class UserInRoomView(APIView):
    def get(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {'code': self.request.session.get(SESSION_ROOM_CODE)}

        return JsonResponse(data=data, status=status.HTTP_200_OK)


class LeaveRoomView(APIView):
    def post(self, request):
        if self.request.session.exists(self.request.session.session_key) and (
            code := self.request.session.get(SESSION_ROOM_CODE)
        ):
            del self.request.session[SESSION_ROOM_CODE]

            # If the host leaves, the room needs to be closed
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            room_deleted = False
            if queryset.exists():
                queryset[0].delete()
                room_deleted = True

            return Response(
                {
                    'Message': f'Room exited: {code} and '
                    f'room {"was" if room_deleted else "not"} deleted'
                },
                status=status.HTTP_200_OK,
            )
        return Response({'Message': 'Was not in room'}, status=status.HTTP_200_OK)
