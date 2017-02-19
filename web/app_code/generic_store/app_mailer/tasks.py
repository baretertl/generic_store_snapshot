import json
from celery.decorators import task
from .decoders import AppMailerDecoder


#task for sending emial
@task(name="app_mailer_task")
def app_mailer_task(encoded_email):
	#reload the object from pickle
	email = json.loads(encoded_email, cls=AppMailerDecoder)
	email.send()
	return { "Email Sent Successfully" : encoded_email }