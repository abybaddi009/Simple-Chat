from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

app_name = "authentication"

urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("register/", views.UserRegisterAPI.as_view(), name="register"),
    path("token_refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("users/", views.UserListAPIView.as_view(), name="users-list"),
    path("details/", views.UserDetailsView.as_view(), name="user-details"),
    path("update_details/", views.UserUpdateView.as_view(), name="user-update-details"),
    path(
        "profile/", views.ProfileImageCreateUpdateAPIView.as_view(), name="user-profile"
    ),
]
