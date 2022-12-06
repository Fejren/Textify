from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from core.models import Chat, Contact
from chat.views import get_user_contact

User = get_user_model()


class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id',)

    def create(self, validated_data):
        print(validated_data)
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for id in participants:
            user = get_object_or_404(User, email=id)
            contact = get_user_contact(user.id)
            chat.participants.add(contact)
        chat.save()
        return chat
