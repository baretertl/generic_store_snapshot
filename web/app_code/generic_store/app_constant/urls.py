from django.conf.urls import url
from .views import AppConstantView

urlpatterns = [
	url(r'^$', AppConstantView.as_view())
]