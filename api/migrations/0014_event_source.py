# Generated by Django 3.2.10 on 2022-01-02 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20211228_0053'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='source',
            field=models.URLField(blank=True, null=True),
        ),
    ]
