from rest_framework import permissions

class IsUserSelf(permissions.BasePermission):
	message = 'Access Denied'
	
	#nothing to check here
	def has_permission(self, request, view):
		return True

	#check the user is itself
	def has_object_permission(self, request, view, obj):
		return request.user == obj

