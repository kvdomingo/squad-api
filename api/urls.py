from django.urls import path
from .views import *


urlpatterns = [
    path('event/', EventView.as_view()),
    path('user/', DiscordUserView.as_view()),
    path('birthday/', BirthdayView.as_view()),
]
