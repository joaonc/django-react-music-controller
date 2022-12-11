from rest_framework import generics

from .models import Room
from .serializers import RoomSerializer


class RoomViewList(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomViewCreate(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
