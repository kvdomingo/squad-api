from django.db import models


class Event(models.Model):
    group = models.CharField(max_length=64)
    name = models.CharField(max_length=256)
    date = models.DateTimeField()

    class Meta:
        ordering = ['date']

    def __str__(self):
        return f'[{self.group.upper()}] {self.name}'


class DiscordUser(models.Model):
    discordId = models.CharField(max_length=32)
    username = models.CharField(max_length=32)
    discriminator = models.CharField(max_length=4)

    def __str__(self):
        return f'{self.username}#{self.discriminator}'


class Bias(models.Model):
    user = models.ForeignKey(
        DiscordUser,
        related_name='biases',
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=32)
    currentHolder = models.ForeignKey(
        DiscordUser,
        related_name='biases_won',
        on_delete=models.SET_NULL,
        null=True,
    )

    class Meta:
        ordering = ['user__username', 'name']
        verbose_name_plural = 'biases'

    def __str__(self):
        return f'{self.user.username} - {self.name}'
