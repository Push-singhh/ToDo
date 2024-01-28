"""
This file contains function to change positions of tasks
"""
from django.db import transaction
from django.db.models import F

from .models import Task
from category.models import Category


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
    Category.objects.filter(id=category.id).update(num_of_active_task=F("num_of_active_task") - 1)


@transaction.atomic
def insert_back_to_active_task(to_position, category):
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
        position_available = to_position
    else:
        position_available = last_position + 1

    Category.objects.filter(id=category.id).update(num_of_active_task=F("num_of_active_task") + 1)
    return position_available
