from collections import deque

from google.appengine.ext import endpoints
from protorpc import remote
from protorpc import messages
from protorpc import message_types


# Should save messages in a database 
# but we just keep then in memory for this example.
MESSAGES = deque(maxlen=10)


class BlankMessage(messages.Message):
	pass


class MessageMessage(messages.Message):
	createdAt = message_types.DateTimeField(1, required=True)
	createdBy = messages.StringField(2, required=True)
	content = messages.StringField(3, required=True)


class MessageListMessage(messages.Message):
	messages = messages.MessageField(MessageMessage, 1, repeated=True)
		


@endpoints.api(name='guestbook', version='v1', description='Sample Guest Book')
class GuestBookApi(remote.Service):
	
	@endpoints.method(
		MessageMessage, BlankMessage, name='messages.insert',
		path='guestbook/messages/new', http_method='POST'
	)
	def insert_message(self, request):
		MESSAGES.append({
			'createdAt': request.createdAt,
			'createdBy': request.createdBy,
			'content': request.content
			})
		return BlankMessage()

	@endpoints.method(
		BlankMessage, MessageListMessage, name='messages.list',
		path='guestbook/messages', http_method='GET'
	)
	def list_messages(self, request):
		msgs = []
		for msg in MESSAGES:
			msgs.append(MessageMessage(
				createdAt=msg['createdAt'],
				createdBy=msg['createdBy'],
				content=msg['content']
			))
		return MessageListMessage(messages=msgs)


application = endpoints.api_server([GuestBookApi], restricted=False)
