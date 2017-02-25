from django.conf.urls import url
from .views import create, login, logout, UserDetail

urlpatterns = [
	url(r'^create/$', create),
	url(r'^login/$', login),
	url(r'^logout/$', logout),
	url(r'^detail/(?P<pk>[0-9]+)$', UserDetail.as_view()),
]