# Generated by Django 4.2.7 on 2023-12-03 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0004_category_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='title',
            field=models.CharField(max_length=120),
        ),
    ]
