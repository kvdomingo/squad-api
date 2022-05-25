from rest_framework import serializers
from .models import Event, Birthday


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class BirthdaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Birthday
        fields = "__all__"
