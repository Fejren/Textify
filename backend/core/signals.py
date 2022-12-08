from djoser.signals import user_registered
from django.dispatch import receiver

from core.models import Contact


@receiver(user_registered)
def handle_register(user, request):
    print(user)
