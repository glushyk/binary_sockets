var express = require('express');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var app = express();


var server = app.listen(1337);
var io = socketio.listen(server);


var clientDir = __dirname+'/client/';
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({                           
  extended: true
}));

var messages = [];

app.get("/", function (req,res) {
	res.sendFile(clientDir + 'index.html');
});

io.on('connection', function (socket) {
	console.log("User Connected");
	socket.on('disconnected', function() {
		console.log("User disconnected");
	});

	socket.on('chat message', function (msg) {
		messages.push(msg);
		io.emit('chat message', msg);
	});

	socket.emit('chat history', messages);
})



