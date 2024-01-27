"""
This file contains function to change positions of tasks
"""
from django.db import transaction
from django.db.models import F

from .models import Task


@transaction.atomic
def change_task_position(current_position, new_position, category):
    if current_position < new_position:
        Task.objects.filter(position__lte=new_position,
                            position__gt=current_position,
                            category=category,
                            completed_at__isnull=True).update(position=F("position") - 1)
    elif current_position > new_position:
        Task.objects.filter(position__lt=current_position,
                            position__gte=new_position,
                            category=category,
                            completed_at__isnull=True).update(position=F("position") + 1)


@transaction.atomic
def shift_task_after_completion(from_position, category):
    Task.objects.filter(position__gt=from_position,
                        category=category,
                        completed_at__isnull=True).update(position=F("position") - 1)


@transaction.atomic
def insert_task_back_to_uncompleted(to_position, category):
    last_record = (Task.objects.filter(category=category, completed_at__isnull=True).
                   order_by('position').last())
    if last_record:
        last_position = last_record.position
    else:
        last_position = 0

    if to_position < last_position:
        Task.objects.filter(position__gte=to_position,
                            category=category,
                            completed_at__isnull=True).update(position=F("position") + 1)
        return to_position
    else:
        return last_position + 1
