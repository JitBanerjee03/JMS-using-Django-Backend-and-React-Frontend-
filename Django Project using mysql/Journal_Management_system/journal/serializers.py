from rest_framework import serializers
from .models import SubjectArea,JournalSection,Journal

class SubjectAreaSerializer(serializers.ModelSerializer): #serializer for subject area
    class Meta:
        model = SubjectArea
        fields = ['id', 'name']

class JournalSectionSerializer(serializers.ModelSerializer): #serializer for journal section
    class Meta:
        model = JournalSection
        fields = ['id', 'name']

class JournalSerializer(serializers.ModelSerializer): #serializer for journal
    class Meta:
        model = Journal
        fields = '__all__'  # Or specify explicitly if you prefer

class JournalStatusSerializer(serializers.ModelSerializer): #serializer for journal status
    class Meta:
        model = Journal
        fields = ['id', 'title', 'submission_date', 'status']
