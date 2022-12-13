from django.core.exceptions import ValidationError
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Room
from .serializers import CreateRoomSerializer, RoomSerializer


class ListRoomsView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoom(APIView):
    serializer_class = RoomSerializer

    def get(self, request, code):
        if code:
            try:
                room = Room.objects.filter(code=code)
            except ValidationError as e:
                return Response({'Invalid': '; '.join(e.messages)}, status.HTTP_400_BAD_REQUEST)
            else:
                if len(room) > 0:
                    data = RoomSerializer(room[0]).data
                    data['is_host'] = self.request.session.session_key == room[0].host

                    return Response(data, status=status.HTTP_200_OK)
                return Response({'Invalid': 'Room code not found.'}, status.HTTP_404_NOT_FOUND)
        return Response({'Invalid': 'Room code not provided.'}, status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request):
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

            return Response(
                data=RoomSerializer(room).data,
                status=status.HTTP_201_CREATED,
            )
