from django.conf import settings
from django.contrib import admin
from .models import *

admin.site.site_header = 'Schedule API Admin'
admin.site.site_title = 'Schedule API Admin'
admin.site.index_title = 'Admin'

if settings.PYTHON_ENV == 'production':
    admin.site.site_url = 'https://schedule.kvdstudio.app'
else:
    admin.site.site_url = 'http://localhost:3000'

admin.site.register(Bias)
admin.site.register(DiscordUser)
admin.site.register(Event)
