from django.urls import path
from .views import *


urlpatterns = [
    path('event/', EventView.as_view()),
]
