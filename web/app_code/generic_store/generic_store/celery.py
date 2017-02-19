from __future__ import absolute_import
import os
from django.conf import settings
from celery import Celery


# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'generic_store.settings')
celery_main_app = Celery('generic_store')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
celery_main_app.config_from_object('django.conf:settings')
celery_main_app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

@celery_main_app.task(bind=True)
def debug_task(self):
  print('Request: {0!r}'.format(self.request))