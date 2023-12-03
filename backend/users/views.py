from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import permissions, authentication
from rest_framework.response import Response
from rest_framework import generics

from .models import User
from .serializer import UserSerializer, RegisterUserSerializer


class UsersDetailUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


users_detail_update_view = UsersDetailUpdateAPIView.as_view()


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterUserSerializer


register_user_api_view = RegisterUserAPIView.as_view()


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
