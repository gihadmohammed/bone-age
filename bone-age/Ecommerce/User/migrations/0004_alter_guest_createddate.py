# Generated by Django 4.1.7 on 2023-05-01 13:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0003_pickuplocations_alter_guest_createddate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guest',
            name='CreatedDate',
            field=models.DateField(default=datetime.datetime(2023, 5, 1, 15, 20, 3, 352704), editable=False),
        ),
    ]
