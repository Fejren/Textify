from django.contrib.auth import get_user_model
from rest_framework import serializers

from core.models import Chat

User = get_user_model()


class CreateChatUserSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class CreateChatSerializer(serializers.ModelSerializer):
    participants = CreateChatUserSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id',)


class ChatUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'avatar',)


class ChatSerializer(serializers.ModelSerializer):
    participants = ChatUserSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id',)
