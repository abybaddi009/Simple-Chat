from django.urls import path

from .views import (
    MessagesListCreateAPIView,
    UserMessagesListAPIView,
)

urlpatterns = [
    path("users_messages/", UserMessagesListAPIView.as_view(), name="users-messages"),
    path("<str:email>/", MessagesListCreateAPIView.as_view(), name="messages-list"),
]
