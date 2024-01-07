from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager

# Create your models here.


class User(AbstractUser):
    username = None
    first_name = None
    last_name = None
    email = models.EmailField("email_address", unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
