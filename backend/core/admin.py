from django.contrib import admin

from .models import *

admin.site.site_header = "Panel administracyjny Textify"

admin.site.register(Message)
admin.site.register(Chat)
admin.site.register(Contact)
# admin.site.register(User)
