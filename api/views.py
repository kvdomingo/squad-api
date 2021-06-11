from django.utils import timezone
from rest_framework.generics import ListAPIView
from .serializers import *


class EventView(ListAPIView):
    queryset = Event.objects.filter(date__gte=timezone.now())
    serializer_class = EventSerializer
