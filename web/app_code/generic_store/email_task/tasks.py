from django.core.mail import EmailMultiAlternatives  
from celery.decorators import task
from generic_store.settings import DEFAULT_FROM_EMAIL

@task(name="email_task")
def email_task(**kwargs):
	if "from_email" in kwargs:
		from_email = kwargs["from_email"]
	else:
		from_email = DEFAULT_FROM_EMAIL	

	if "to" in kwargs:
		to = kwargs["to"]
	else:
		raise EmailTaskException("No to field for email")	

	if "cc" in kwargs:
		cc = kwargs["cc"]
	else:
		cc = []	

	if "bcc" in kwargs:
		bcc = kwargs["bcc"]
	else:
		bcc = []	

	if "subject" in kwargs:
		subject = kwargs["subject"]
	else:
		subject = ""	

	if "body" in kwargs:
		body = kwargs["body"]
	else:
		raise EmailTaskException("No body field for email")	

	if "template_name" in kwargs:
		template_name = kwargs["template_name"]
	else:
		template_name	= None

	if "template_object" in kwargs:
		template_object = kwargs["template_object"]
	else:
		template_object	= None

	msg = EmailMultiAlternatives(subject=subject,
															 body=body,
															 from_email=from_email,
															 to=to,
															 bcc=bcc,
															 cc=cc)

	msg.send(fail_silently=False)

	return "Email Sent"