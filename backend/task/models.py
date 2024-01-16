from datetime import datetime, UTC

from django.db import models
from category.models import Category
from users.models import User

# Create your models here.


class Task(models.Model):
    category = models.ForeignKey(Category, null=False, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    task = models.CharField(max_length=120, null=False)
    note = models.CharField(max_length=120, null=True)
    position = models.IntegerField(null=True)
    created_at = models.DateTimeField(null=False, default=datetime.now(UTC))
    deleted_at = models.DateTimeField(null=True)
    completed_at = models.DateTimeField(null=True)
