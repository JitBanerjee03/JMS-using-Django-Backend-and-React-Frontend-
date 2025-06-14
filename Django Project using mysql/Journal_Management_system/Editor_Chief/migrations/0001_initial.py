# Generated by Django 5.2 on 2025-05-17 15:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EditorInChief',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(blank=True, max_length=20, null=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='eic_profile_pictures/')),
                ('cv', models.FileField(blank=True, null=True, upload_to='eic_cvs/')),
                ('institution', models.CharField(max_length=255)),
                ('position_title', models.CharField(blank=True, max_length=255, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
                ('editor_bio', models.TextField(blank=True, null=True)),
                ('orcid_id', models.CharField(blank=True, max_length=50, null=True)),
                ('linkedin_profile', models.URLField(blank=True, null=True)),
                ('google_scholar_profile', models.URLField(blank=True, null=True)),
                ('scopus_id', models.CharField(blank=True, max_length=100, null=True)),
                ('web_of_science_id', models.CharField(blank=True, max_length=100, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
