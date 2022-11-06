from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Message

User = get_user_model()


class SendMessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    timestamp = serializers.ReadOnlyField()
    seen = serializers.ReadOnlyField()

    class Meta:
        model = Message
        fields = "__all__"

    def get_sender(self, instance):
        return instance.sender.email

    def get_receiver(self, instance):
        return instance.receiver.email


class UserContactsSerializer(serializers.Serializer):
    email = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    photo = serializers.SerializerMethodField()
    latest_message = serializers.CharField()  # SerializerMethodField()
    latest_message_at = serializers.DateTimeField()
    unseen = serializers.IntegerField()

    def get_photo(self, instance):
        try:
            return instance.photos.photo.url
        except User.photos.RelatedObjectDoesNotExist:
            return None

    def get_latest_message(self, instance) -> str:
        return SendMessageSerializer(instance.latest_message).data
