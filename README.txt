swsc -  simple websockets chat
Author: Krenn Benjamin

1) 	npm install

2) 	npm start
	or

	node server.js

3)	navigate to http://localhost:8080

Useage:
	write some text in the box and click on the send button to send messages
	or choose an image you want to send to all connected clients.
	(to avoid the known bug, please use the delivered "archwp.png" file to test this functionality) 

known bugs:
	When sending large pictures the websocket connection will close.
	This might be due to the fact that the server may not be able to reassemble the fragmented string.
	This may be just a websocket server configuration issue or a plain and simple programming error by
	sending stringified json objects and/or trying to store json objects containing a long string as value.
	Maybe the string are getting parsed to fast while not being fully processed.

	there is no input validation so you can send empty messages and the file chooser will accept every filetype.
