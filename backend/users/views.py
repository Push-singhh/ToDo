from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import permissions, authentication
from rest_framework.response import Response
from rest_framework import viewsets, generics

from .models import User
from .serializer import UserSerializer, RegisterUserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterUserSerializer


register_user_api_view = RegisterUserAPIView.as_view()


class CustomAuthToken(ObtainAuthToken):

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })