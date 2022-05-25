from django.db import models


class Event(models.Model):
    group = models.CharField(max_length=64)
    name = models.CharField(max_length=256)
    date = models.DateTimeField()
    source = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ["-date", "group", "name"]

    def __str__(self):
        return f"{self.date.strftime('%Y-%m-%d')} | {self.group} | {self.name}"


class Birthday(models.Model):
    group = models.CharField(max_length=64, blank=True, null=True)
    name = models.CharField(max_length=64)
    date = models.DateField()

    class Meta:
        ordering = ["date__month", "date__day"]

    def __str__(self):
        group = f"({self.group})" if self.group else ""
        return f"[{self.date}] {self.name} {group}"
