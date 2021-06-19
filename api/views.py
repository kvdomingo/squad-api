from django.utils import timezone
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


class EventView(ListAPIView):
    queryset = Event.objects.filter(date__gte=timezone.now())
    serializer_class = EventSerializer


class DiscordUserView(APIView):
    def get(self, request, discord_id):
        try:
            query = DiscordUser.objects.get(discordId=discord_id)
        except DiscordUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DiscordUserSerializer(query)
        return Response(serializer.data)

    def post(self, request, discord_id=None):
        serializer = DiscordUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, discord_id):
        user = DiscordUser.objects.get(discordId=discord_id)
        serializer = DiscordUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BiasView(APIView):
    def get(self, request, discord_id):
        qs1 = Bias.objects.filter(user__discordId=discord_id)
        qs2 = Bias.objects.filter(currentHolder__discordId=discord_id)
        queryset = (qs1 | qs2).distinct().order_by('user')
        serializer = BiasSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
