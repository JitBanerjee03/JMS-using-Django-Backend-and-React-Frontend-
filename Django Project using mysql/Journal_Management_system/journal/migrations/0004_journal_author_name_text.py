# Generated by Django 5.2 on 2025-05-05 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0003_deletionotp'),
    ]

    operations = [
        migrations.AddField(
            model_name='journal',
            name='author_name_text',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
