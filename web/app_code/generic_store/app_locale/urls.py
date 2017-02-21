from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import get_locale, set_locale, AppLocaleNameViewSet

#routers for viewsets
router = DefaultRouter()
router.register(r'applocalename', AppLocaleNameViewSet)

#url patterns
urlpatterns = [
	url(r'get_locale/$', get_locale),
	url(r'set_locale/$', set_locale),
  url(r'^', include(router.urls)),
]