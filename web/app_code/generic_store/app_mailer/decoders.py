from json import JSONDecoder
from .objects import AppMailer

#use to decode json to AppMailer object
class AppMailerDecoder(JSONDecoder):
	def __init__(self, *args, **kwargs):
		super(AppMailerDecoder, self).__init__(object_hook=self.object_hook, *args, **kwargs)

	#return a dictionary representation of the object	
	def object_hook(self, obj):
		#outer most object, construct the AppMailer object
		if "from_email" in obj:
			return AppMailer(**obj)

		return obj