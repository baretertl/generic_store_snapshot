from django.conf.urls import url
from .views import ConstantGroupView

urlpatterns = [
	url(r'^constant_group', ConstantGroupView.as_view())
]