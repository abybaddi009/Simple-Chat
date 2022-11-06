from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from django.contrib.auth import get_user_model

from .models import ProfileImage

User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    photo = serializers.SerializerMethodField()

    def get_photo(self, instance):
        try:
            return instance.photos.photo.url
        except User.photos.RelatedObjectDoesNotExist:
            return None

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "photo",
            "is_active",
            "staff",
            "admin",
            "created_at",
            "modified_at",
        ]

class UserUpdateSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField()
    password = serializers.CharField(
        write_only=True,
        required=False,
        help_text="Leave empty if no change needed",
        style={"input_type": "password", "placeholder": "Password"},
    )
    password2 = serializers.CharField(
        write_only=True,
        required=False,
        help_text="Leave empty if no change needed",
        style={"input_type": "password", "placeholder": "Confirm Password"},
    )

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "password",
            "password2"
        ]

    def validate(self, attrs):
        if attrs.get("password2") != attrs.get("password"):
            raise ValidationError(
                {"password": "Password and confirm password must match."}
            )
        return attrs

    def update(self, instance, validated_data):
        if hasattr(validated_data, "password") and validated_data['password'] != "":
            instance.set_password(validated_data['password'])
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.save()
        return instance


class ProfileImageSerializer(serializers.ModelSerializer):
    created_at = serializers.ReadOnlyField()
    modified_at = serializers.ReadOnlyField()
    user = serializers.SerializerMethodField()

    def get_user(self, instance) -> str:
        return instance.user.email

    class Meta:
        model = ProfileImage
        fields = "__all__"


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
    )

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )

        user.set_password(validated_data["password"])
        user.save()

        return user

    def validate(self, attrs):
        if attrs.get("password2") != attrs.get("password"):
            raise ValidationError(
                {"password": "Password and confirm password must match."}
            )
        return attrs

    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email", "password", "password2")
        write_only_fields = ("password", "password2")
        read_only_fields = ("id",)
