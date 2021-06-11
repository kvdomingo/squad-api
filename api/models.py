from django.db import models


class Event(models.Model):
    group = models.CharField(max_length=64)
    name = models.CharField(max_length=256)
    date = models.DateTimeField()

    class Meta:
        ordering = ['date']

    def __str__(self):
        return f'[{self.group.upper()}] {self.name}'
