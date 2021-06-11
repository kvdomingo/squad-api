from rest_framework.generics import ListAPIView
from .serializers import *


class EventView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
