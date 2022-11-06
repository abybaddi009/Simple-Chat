from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Message(models.Model):
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="sent_messages"
    )
    receiver = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="received_messages"
    )
    seen = models.BooleanField(default=False)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self) -> str:
        return f"Message <{self.id}>: {self.seen}"
