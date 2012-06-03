var Chat = require('./chat');
var Music = require('./music');
var Game = require('./game');
var User = require('./user');

module.exports = function(app) {
  var io = require('socket.io').listen(app);


  io.configure(function(){
    io.set('log level', 2);
    io.set('transports', [
        'websocket'
      , 'flashsocket'
      , 'htmlfile'
      , 'xhr-polling'
      , 'jsonp-polling'
    ]);
  });
 

  var Eventy = io
    .of('/index')
    .on('connection', function(socket) { 
      console.log('index 유저 접속 상태');

	  socket.on('s', function() {
		  console.log('서버 사이드 메시지');
		  var msg = '서버 사이드 메시지';
			socket.emit('sed', {msg: msg});
	  });

      
      socket.on('leave', function(data) {
        if (joinedRoom) {
          Chat.leaveRoom(joinedRoom, data.nickName); ///제거하고 브로드 캐스팅으로 알려준다.
          socket.broadcast.to(joinedRoom).emit('leaved', {
            nickName:data.nickName });
          socket.leave(joinedRoom)
        }
      })
    });
}