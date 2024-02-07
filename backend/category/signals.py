from .models import Category

from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
channel_layer = get_channel_layer()


@receiver(post_save, sender=Category)
def send_category_update_event(sender, instance, created, **kwargs):
    async_to_sync(channel_layer.group_send)(str(instance.user.id), {"type": "todo_update_event",
                                                                    "update_event": "update_category"})


@receiver(post_delete, sender=Category)
def send_category_delete_event(sender, instance, **kwargs):
    async_to_sync(channel_layer.group_send)(str(instance.user.id), {"type": "todo_update_event",
                                                                    "update_event": "update_category"})
