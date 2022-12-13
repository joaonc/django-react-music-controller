from rest_framework import serializers

from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = (
            'id',
            'code',
            'host',
            'guest_can_pause',
            'votes_to_skip',
            'create_at',
        )


class CreateRoomSerializer(serializers.ModelSerializer):
    """Payload to create a room on a POST request.

    Note that ``host`` (as well as ``room`` and ``created_at``) is calculated at creation time
    (with session info) and not part of the payload.
    """

    class Meta:
        model = Room
        fields = (
            'guest_can_pause',
            'votes_to_skip',
        )
