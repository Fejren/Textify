from django.contrib.auth import get_user_model
from rest_framework import serializers

from core.models import Chat
from user.serializers import UserSerializer

User = get_user_model()


class ChatSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id',)
