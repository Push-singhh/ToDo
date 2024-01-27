"""
This file contains function to change positions of categories
"""

from django.db import transaction
from django.db.models import F

from .models import Category


@transaction.atomic
def change_category_position(current_position, new_position):
    if current_position < new_position:
        Category.objects.filter(position__lte=new_position,
                                position__gt=current_position).update(position=F("position") - 1)

    elif current_position > new_position:
        Category.objects.filter(position__lt=current_position,
                                position__gte=new_position,).update(position=F("position") + 1)


@transaction.atomic
def shift_category_after_deletion(from_position):
    Category.objects.filter(position__gt=from_position).update(position=F("position") - 1)
