from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, mixins
from core.models import Chat
from .serializers import ChatSerializer, CreateChatSerializer

from rest_framework import permissions

User = get_user_model()


class ChatViewSet(viewsets.GenericViewSet,
                  mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return ChatSerializer
        if self.action == 'create':
            return CreateChatSerializer

        return self.serializer_class

    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.AllowAny(), ]
        if self.action == 'list':
            return [permissions.AllowAny(), ]

        return [permissions.IsAuthenticated(), ]

    def get_queryset(self):
        if self.action == 'list':
            queryset = Chat.objects.all()
            user_id = self.request.query_params.get('id', None)
            if user_id is not None:
                user = get_object_or_404(User, id=user_id)
                queryset = user.chats.all()
            return queryset

    def perform_create(self, serializer):
        participants = self.request.data.get("participants", None)
        users = []
        for email in participants:
            user = get_object_or_404(User, email=email)
            users.append(user)
        serializer.save(participants=users, messages=[])
