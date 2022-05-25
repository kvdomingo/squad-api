from django.contrib import admin
from .models import Birthday, Event

admin.site.site_header = "Schedule API Admin"
admin.site.site_title = "Schedule API Admin"
admin.site.index_title = "Admin"

admin.site.register(Birthday)
admin.site.register(Event)
