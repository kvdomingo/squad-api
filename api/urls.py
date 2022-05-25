from django.urls import path
from .views import EventView, BirthdayView


urlpatterns = [
    path("event", EventView.as_view()),
    path("birthday", BirthdayView.as_view()),
]
