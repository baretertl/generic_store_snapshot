from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .tasks import email_task

@api_view(['GET'])
def send_email_plain(request, format='json'):
	email_task.delay(to=['chang.s.zheng@gmail.com'],
									 subject='Plain Text Email',
									 body='Hello World')
	return Response(status=status.HTTP_200_OK)