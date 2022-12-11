from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save

from backend import settings


class UserManager(BaseUserManager):

    def create_user(self, first_name, last_name, email, password=None, **extra_fields):
        # Create and save new user
        if not email:
            raise ValueError('User must have an email address')
        if not first_name:
            raise ValueError('User must have a first name')
        if not last_name:
            raise ValueError('User must have a last name')

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, first_name, last_name, email, password):
        # Create new superuser
        user = self.create_user(first_name, last_name, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    # Custom user model

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    avatar = models.ImageField(default="user_profile_default.png")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    REQUIRED_FIELDS = ['first_name', 'last_name']
    USERNAME_FIELD = 'email'

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_first_name(self):
        return self.first_name

    def __str__(self):
        return self.email


user_model = get_user_model()


class Contact(models.Model):
    user = models.ForeignKey(
        user_model, related_name='friends', on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.email


class Message(models.Model):
    contact = models.ForeignKey(
        Contact, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.user.email


def create_contact(sender, instance, created, **kwargs):
    if created:
        Contact.objects.create(user=instance)
        print('contact created!')


post_save.connect(create_contact, sender=User)


class Chat(models.Model):
    participants = models.ManyToManyField(
        Contact, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return f"{self.pk}"
