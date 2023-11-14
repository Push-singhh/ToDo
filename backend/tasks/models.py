from django.db import models

# Create your models here.


class TaskCategory(models.Model):
    title = models.CharField(max_length=120, unique=True)
    description = models.CharField(max_length=120, null=True)

    @property
    def view_title(self):
        return str(self.title).swapcase()

    def lower_title(self):
        return str(self.title).lower()
