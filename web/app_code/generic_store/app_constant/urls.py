from django.conf.urls import url
from .views import AppConstantGroupView

urlpatterns = [
	url(r'^app_constant_group', AppConstantGroupView.as_view())
]