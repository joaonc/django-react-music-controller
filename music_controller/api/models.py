import uuid

from django.db import models


class Room(models.Model):
    code = models.UUIDField(default=uuid.uuid4, editable=False)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(default=False, null=False)
    votes_to_skip = models.IntegerField(default=1, null=False)
    create_at = models.DateTimeField(auto_now_add=True)
