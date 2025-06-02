from django.db import models
from django.contrib.auth.models import User

class EditorInChief(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='eic_profile_pictures/', blank=True, null=True)
    cv = models.FileField(upload_to='eic_cvs/', blank=True, null=True)

    institution = models.CharField(max_length=255)
    position_title = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)

    editor_bio = models.TextField(blank=True, null=True)
    orcid_id = models.CharField(max_length=50, blank=True, null=True)
    linkedin_profile = models.URLField(blank=True, null=True)
    google_scholar_profile = models.URLField(blank=True, null=True)
    scopus_id = models.CharField(max_length=100, blank=True, null=True)
    web_of_science_id = models.CharField(max_length=100, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)  # New field
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.user.email})"