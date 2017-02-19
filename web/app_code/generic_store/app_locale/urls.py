from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from . import views

#routers for viewsets
router = DefaultRouter()
router.register(r'AppLocaleName', views.AppLocaleNameViewSet)

#url patterns
urlpatterns = [
	url(r'get/$', views.current),
	url(r'set/$', views.set),
  url(r'^', include(router.urls)),
]