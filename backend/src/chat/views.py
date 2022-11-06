from django.contrib.auth import get_user_model
from django.db.models import Q, OuterRef, Subquery, Sum, Count, Case, When, F
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, UpdateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Message
from .serializers import (
    SendMessageSerializer,
    UserContactsSerializer,
)

User = get_user_model()


class MessagesListCreateAPIView(ListCreateAPIView):
    serializer_class = SendMessageSerializer

    def get_queryset(self):
        if self.request.user.email == self.kwargs["email"]:
            return Message.objects.none()
        return Message.objects.filter(
            Q(sender__email=self.request.user, receiver__email=self.kwargs["email"])
            | Q(sender__email=self.kwargs["email"], receiver__email=self.request.user)
        )

    def list(self, request, *args, **kwargs):
        unseen = Message.objects.filter(sender__email=self.kwargs['email'], receiver=self.request.user, seen=False)
        for message in unseen:
            message.seen = True
        Message.objects.bulk_update(unseen, ['seen'])
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        receiver_email = self.kwargs["email"]
        receiver = get_object_or_404(User, email=receiver_email)
        if self.request.user == receiver:
            return Response(
                data={"error": "Cannot send a message to yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(sender=request.user, receiver=receiver)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class UserMessagesListAPIView(APIView):
    serializer_class = UserContactsSerializer

    def get_queryset(self):
        newest = Message.objects.filter(
            Q(receiver=self.request.user, sender=OuterRef("pk"))
            | Q(sender=self.request.user, receiver=OuterRef("pk"))
        ).order_by("-timestamp")

        unseen = (
            Message.objects.filter(
                receiver=self.request.user, sender=OuterRef("pk"), seen=False
            )
            .order_by("-timestamp")
            .values("id")
        )

        email_ids = Message.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user)
        )
        emails = set()
        for email in email_ids:
            emails.add(email.sender.email)
            emails.add(email.receiver.email)
        if self.request.user.email in emails:
            emails.remove(self.request.user.email)

        users_qs = User.objects.filter(email__in=emails)
        users_qs = users_qs.annotate(latest_message=Subquery(newest.values("text")))
        users_qs = users_qs.annotate(latest_message_at=Subquery(newest.values("timestamp")))
        users_qs = users_qs.annotate(
            unseen=Count(
                Case(
                    When(
                        # received_messages__sender__email=F('email'),
                        sent_messages__receiver=self.request.user,
                        sent_messages__seen=False,
                        then="sent_messages",
                    )
                )
            )
        )
        return users_qs.order_by("-latest_message_at")

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
