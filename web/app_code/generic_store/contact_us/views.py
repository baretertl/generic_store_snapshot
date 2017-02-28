import json
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from app_mailer.exceptions import AppMailerException
from app_mailer.objects import AppMailer
from app_mailer.encoders import AppMailerEncoder
from app_mailer.tasks import app_mailer_task
from store_info.models import ContactInfo

@api_view(['POST'])
def send_contact_email(request, format='json'):
	CONTACT_EMAIL_SUBJECT = 'A message as been submitted by {}<{}>'
	try:
		#validate requied fields
		if not 'name' in request.data:
			raise ValidationError('name is required')

		if not 'email' in request.data:
			raise ValidationError('email is required')

		if not 'subject' in request.data:
			raise ValidationError('subject is required')

		if not 'message' in request.data:
			raise ValidationError('message is required')

		validate_email(request.data.get('email'))
		#get post data
		post_data = {
			'name': request.data.get('name'),
			'email': request.data.get('email'),
			'subject': request.data.get('subject'),
			'message': request.data.get('message')
		}		
		#get store contact info
		contact_info_obj = ContactInfo.objects.all().first()
		#create email object and send to task
		email = AppMailer(to=[contact_info_obj.email_address],
							  			subject=CONTACT_EMAIL_SUBJECT.format(post_data['name'], post_data['email']),
											text_template='contact_email.txt',
											text_object=post_data,
											html_template='contact_email.html',
											html_object=post_data)
		#encode the object
		app_mailer_task.delay(json.dumps(email, cls=AppMailerEncoder))
		return Response(status=status.HTTP_200_OK)

	except ValidationError as e:
		return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

	except AppMailerException as e:
		return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)