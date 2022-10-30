from django.contrib import admin

from .models import Message, User

admin.site.site_header = "Panel administracyjny Textify"


class MessageAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'created_at']
    list_filter = ['sender', 'receiver', 'created_at']


admin.site.register(Message, MessageAdmin)
admin.site.register(User)
