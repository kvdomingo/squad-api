from rest_framework import serializers
from .models import *


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class BirthdaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Birthday
        fields = "__all__"


class DiscordUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscordUser
        fields = "__all__"


class BiasSerializer(serializers.ModelSerializer):
    currentHolder = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Bias
        fields = "__all__"

    def get_currentHolder(self, obj):
        user = DiscordUser.objects.get(pk=obj.currentHolder.id)
        serializer = DiscordUserSerializer(user)
        return serializer.data

    def get_user(self, obj):
        user = DiscordUser.objects.get(pk=obj.user.id)
        serializer = DiscordUserSerializer(user)
        return serializer.data
