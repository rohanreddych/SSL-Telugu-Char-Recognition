# Generated by Django 4.0.1 on 2022-01-20 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imgs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='preds',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
