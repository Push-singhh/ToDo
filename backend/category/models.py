from django.db import models
from users.models import User

# Create your models here.


class Category(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=120, null=True)
    position = models.IntegerField(null=False)

    @property
    def view_title(self):
        return str(self.title).swapcase()

    def lower_title(self):
        return str(self.title).lower()
