import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from app_mailer.exceptions import AppMailerException
from app_mailer.objects import AppMailer
from app_mailer.encoders import AppMailerEncoder
from app_mailer.tasks import app_mailer_task

@api_view(['GET'])
def send_email_plain(request, format='json'):
	try:
		email = AppMailer(to=['chang.s.zheng@gmail.com'],
							  			subject='Plain Text Email',
											text_template='generic_email.txt',
											text_object={'user': 'Chang Zheng', 'body': 'Hello World'}
											)
		#encode the object
		app_mailer_task.delay(json.dumps(email, cls=AppMailerEncoder))
		return Response(status=status.HTTP_200_OK)

	except AppMailerException as e:
		return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def send_email_html(request, format='json'):
	try:
		email = AppMailer(to=['chang.s.zheng@gmail.com'],
							  			subject='Plain Text Email',
											text_template='generic_email.txt',
											text_object={'user': 'Chang Zheng', 'body': 'Hello World'},
											html_template='generic_email.html',
											html_object={'user': 'Chang Zheng', 'body': 'Hello World HTML'})
		#encode the object
		app_mailer_task.delay(json.dumps(email, cls=AppMailerEncoder))
		return Response(status=status.HTTP_200_OK)

	except AppMailerException as e:
		return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)