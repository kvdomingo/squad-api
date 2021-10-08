from django.contrib import admin
from .models import *

admin.site.site_header = 'Schedule API Admin'
admin.site.site_title = 'Schedule API Admin'
admin.site.index_title = 'Admin'

admin.site.register(Bias)
admin.site.register(Birthday)
admin.site.register(DiscordUser)
admin.site.register(Event)
