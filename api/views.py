from datetime import timedelta
from django.utils import timezone
from rest_framework.generics import ListAPIView
from .models import Event, Birthday
from .serializers import EventSerializer, BirthdaySerializer


class EventView(ListAPIView):
    queryset = Event.objects.filter(date__gte=timezone.localdate()).order_by("date")
    serializer_class = EventSerializer


class BirthdayView(ListAPIView):
    serializer_class = BirthdaySerializer

    def get_queryset(self):
        _date_1_month_from_now = timezone.localdate() + timedelta(days=28)
        _birthdays_left_this_month = Birthday.objects.filter(date__month=timezone.localdate().month).filter(
            date__day__gte=timezone.localdate().day
        )
        _birthdays_next_month = Birthday.objects.filter(date__month=_date_1_month_from_now.month).filter(
            date__day__lte=_date_1_month_from_now.day
        )
        queryset = _birthdays_left_this_month | _birthdays_next_month
        if _date_1_month_from_now.month == 1:
            queryset = sorted(
                queryset,
                key=lambda birthday: birthday.date.month,
                reverse=True,
            )
        return queryset
