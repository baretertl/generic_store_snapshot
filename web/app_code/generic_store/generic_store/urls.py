"""generic_store URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import os
from django.conf.urls import url, include
from django.contrib import admin
from django.views.static import serve
from django.views.generic.base import TemplateView
from .settings import DEBUG, BASE_DIR

urlpatterns = [
  url(r'^admin/', admin.site.urls),
  url(r'^api/account/', include('account.urls')),
  url(r'^api/app_constant/', include('app_constant.urls')),
  url(r'^api/app_locale/', include('app_locale.urls')),
  url(r'^api/contact_us/', include('contact_us.urls')),
  url(r'^api/store_info/', include('store_info.urls')),
  url(r'^api/menu/', include('menu.urls'))
]

if(DEBUG):
  urlpatterns += [url(r'^$', serve, {'path': 'index.html', 'document_root': os.path.join(BASE_DIR, 'user_interface/static/')})]