from rest_framework import viewsets, mixins
from core.models import Chat
from .serializers import ChatSerializer

from rest_framework import permissions

from ..views import get_user_contact


class ChatViewSet(viewsets.GenericViewSet,
                  mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

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
                contact = get_user_contact(user_id)
                queryset = contact.chats.all()
            return queryset

    def perform_create(self, serializer):
        serializer.save()
