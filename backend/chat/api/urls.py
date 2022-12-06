from django.urls import path, include

from . import routers
from .views import ChatViewSet

router = routers.CustomRouter()
router.register('', ChatViewSet)

app_name = 'chat'

urlpatterns = [
    path('', include(router.urls))
]
