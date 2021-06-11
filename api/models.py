from django.db import models


class Event(models.Model):
    group = models.CharField(max_length=64)
    name = models.CharField(max_length=256)
    date = models.DateField()
    time = models.TimeField(blank=True, null=True)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return f'[{self.group.upper()}] {self.name}'
