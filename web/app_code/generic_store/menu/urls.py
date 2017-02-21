from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet

router = DefaultRouter()
router.register(r'category', CategoryViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]