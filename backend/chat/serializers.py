from rest_framework import serializers

from core.models import Message, User


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(many=False, slug_field='email', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(many=False, slug_field='email', queryset=User.objects.all())

    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'body', 'created_at']
