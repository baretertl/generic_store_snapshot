from django.conf.urls import url, include
from .views import send_contact_email

urlpatterns = [
	url(r'send_contact_email/$', send_contact_email),
]