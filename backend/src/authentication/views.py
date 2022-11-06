from django.contrib.auth import get_user_model, login


from rest_framework import generics, permissions
from rest_framework import authentication
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import ProfileImage
from .serializers import UserSerializer, UserRegisterSerializer, ProfileImageSerializer, UserUpdateSerializer


User = get_user_model()


class UserRegisterAPI(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "message": "User Created Successfully. Now perform Login to get your token",
            }
        )


class UserListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.exclude(email=self.request.user.email)

class UserDetailsView(APIView):

    def get(self, request, *args, **kwargs):
        instance = User.objects.get(email=self.request.user.email)
        serializer = UserSerializer(instance).data
        return Response(data=serializer, status=status.HTTP_200_OK)

class UserUpdateView(APIView):
    serializer_class = UserUpdateSerializer

    def patch(self, request, *args, **kwargs):
        instance = User.objects.get(email=self.request.user.email)
        serializer = UserUpdateSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data={'error': "Unable to process request."}, status=status.HTTP_400_BAD_REQUEST)

class ProfileImageCreateUpdateAPIView(APIView):
    serializer_class = ProfileImageSerializer
    parser_classes = (MultiPartParser,)

    def get_queryset(self):
        return ProfileImage.objects.filter(user=self.request.user)

    def post(self, request):
        profile_instance = self.get_queryset()

        if profile_instance.count() > 0:
            profile_instance = profile_instance.first()
            serializer = self.serializer_class(profile_instance, data=request.data)
        else:
            serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        profile_instance = self.get_queryset()
        if profile_instance.count() > 0:
            profile_instance = profile_instance.first()
            serializer = self.serializer_class(profile_instance)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data={}, status=status.HTTP_404_NOT_FOUND)
