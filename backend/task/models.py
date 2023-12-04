from django.db import models
from category.models import Category
from users.models import User

# Create your models here.


class Task(models.Model):
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    task = models.CharField(max_length=120)
    note = models.CharField(max_length=120)
