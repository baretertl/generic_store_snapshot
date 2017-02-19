from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from .managers import UserManager

#custom user model
class User(AbstractBaseUser, PermissionsMixin):
	email = models.EmailField(unique=True, blank=False)
	first_name = models.CharField(max_length=30, blank=True)
	last_name = models.CharField(max_length=30, blank=True)
	date_joined = models.DateTimeField(auto_now_add=True)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	def get_full_name(self):
		#Returns the first_name plus the last_name, with a space in between.
		full_name = '{} {}'.format(self.first_name, self.last_name)
		return full_name.strip()

	def get_short_name(self):
		#Returns the short name for the user.
		return self.first_name

	def email_user(self, subject, message, from_email=None, **kwargs):
		#TODO: Sends an email to this User.
		#send_mail(subject, message, from_email, [self.email], **kwargs)
		pass   