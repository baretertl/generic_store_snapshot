from json import JSONEncoder
from .objects import AppMailer

#use to encode the AppMailer object to json
class AppMailerEncoder(JSONEncoder):
	
	#return a dictionary representation of the object	
	def default(self, obj):
		return obj.__dict__