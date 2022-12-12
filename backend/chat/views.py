from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from core.models import Chat

User = get_user_model()


def get_last_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:40]


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)
