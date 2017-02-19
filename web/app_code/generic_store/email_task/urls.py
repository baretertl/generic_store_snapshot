from django.conf.urls import url, include
from . import views

urlpatterns = [
	url(r'send_email_plain/$', views.send_email_plain)
]