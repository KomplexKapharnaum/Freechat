var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;

var history = []

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('user connected')
  
  socket.emit('all messages', history)
  
  socket.on('chat message', function(msg) {
    if (msg == '#clear') {
      io.emit('clear');
      history = []
    }
    else {
      io.emit('chat message', msg);
      history.push(msg)
    }
  });

  socket.on('disconnect', function(msg){
    console.log('user disconnected')
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
