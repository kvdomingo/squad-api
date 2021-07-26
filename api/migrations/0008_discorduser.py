# Generated by Django 3.2.4 on 2021-06-19 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210612_0247'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscordUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('discordId', models.BigIntegerField()),
                ('username', models.CharField(max_length=32)),
                ('discriminator', models.SmallIntegerField()),
            ],
        ),
    ]