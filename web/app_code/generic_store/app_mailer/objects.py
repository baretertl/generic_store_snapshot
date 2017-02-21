from smtplib import SMTPException
from django.core.mail import EmailMultiAlternatives
from django.template import Context
from django.template.loader import render_to_string, get_template
from generic_store.settings import DEFAULT_FROM_EMAIL  
from .exceptions import AppMailerException

#class for sending email
class AppMailer(object):

	#initialize member variables
	def __init__(self, **kwargs):
		if 'from_email' in kwargs:
			if isinstance(kwargs['from_email'], str):
				self.from_email = kwargs['from_email']

			else:
				raise AppMailerException('From Email field must be a string')

		else:
			self.from_email = DEFAULT_FROM_EMAIL

		if 'to' in kwargs:
			if isinstance(kwargs['to'], list):
				self.to = kwargs['to']

			else:
				raise AppMailerException('To field must be a list')

		else:
			self.to = []		

		if 'cc' in kwargs:
			if isinstance(kwargs['cc'], list):
				self.cc = kwargs['cc']

			else:
				raise AppMailerException('CC field must be a list')

		else:
			self.cc = []		

		if 'bcc' in kwargs:
			if isinstance(kwargs['bcc'], list):
				self.bcc = kwargs['bcc']

			else:
				raise AppMailerException('BCC field must be a list')

		else:
			self.bcc = []

		if 'subject' in kwargs:
			if isinstance(kwargs['subject'], str):
				self.subject = kwargs['subject']

			else:
				raise AppMailerException('Subject field must be a string')

		else:
			self.subject = ''

		if 'body' in kwargs:
			if isinstance(kwargs['body'], str):
				self.body = kwargs['body']

			else:
				raise AppMailerException('Body field must be a string')

		else:
			self.body = ''

		if 'text_template' in kwargs:
			if isinstance(kwargs['text_template'], str):
				self.text_template = kwargs['text_template']

			elif kwargs['text_template'] is None:
				self.text_template = None

			else:
				raise AppMailerException('Text Template field must be a string')

		else:
			self.text_template = None

		if 'text_object' in kwargs:
			self.text_object = kwargs['text_object']

		else:
			self.text_object = None

		if 'html_template' in kwargs:
			if isinstance(kwargs['html_template'], str):
				self.html_template = kwargs['html_template']

			elif kwargs['html_template'] is None:
				self.html_template = None

			else:
				raise AppMailerException('Html Template field must be a string')

		else:
			self.html_template = None

		if 'html_object' in kwargs:
			self.html_object = kwargs['html_object']
			
		else:
			self.html_object = None

		if len(self.to) == 0 and len(self.cc) == 0 and len(self.bcc) == 0:
			raise AppMailerException('No recipients for the email')

	#send the email
	def send(self):
		try:
			#get plain text body
			text_body = self.body
			#render plain text body if template and object specified
			if not self.text_template is None and not self.text_object is None:
				text_body = render_to_string(self.text_template, self.text_object)

			email = EmailMultiAlternatives(subject=self.subject,
																		 body=text_body,
																		 from_email=self.from_email,
																		 to=self.to,
																		 bcc=self.bcc,
																		 cc=self.cc)

			#add html if available
			if not self.html_template is None and not self.html_object is None:
				html_body = get_template(self.html_template).render(Context(self.html_object))
				email.attach_alternative(html_body, 'text/html')

			email.send(fail_silently=False)

		except SMTPException as e:
			#reraise exception as AppMailerException
			raise AppMailerException('Error sending email: {}'.format(e))