from datetime import datetime, UTC

from django.db import models
from django.utils import timezone
from users.models import User

# Create your models here.


class Category(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=120, null=True)
    position = models.IntegerField(null=False)
    created_at = models.DateTimeField(null=False, default=timezone.now)
    deleted_at = models.DateTimeField(null=True)

    @property
    def view_title(self):
        return str(self.title).swapcase()

    def lower_title(self):
        return str(self.title).lower()
