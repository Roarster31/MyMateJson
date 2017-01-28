var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 4200;

var currentText = "";

server.listen(port);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  
  socket.emit('textchange', currentText);
  
  socket.on('textchange', function (text) {
    currentText = text;
    socket.broadcast.emit('textchange', text);
  });

  socket.on('notifyTextChange', function (text) {
    socket.broadcast.emit('notifyTextChange', text);
  });
});