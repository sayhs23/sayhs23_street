var Chat = require('./chat');
var Music = require('./music');
var Game = require('./game');
var User = require('./user');
var http = require("http");
var sys = require("util");
var tojson = require('./xml2json');
var sjson = require("xml2json");
var fs = require("fs");

var mysql = require('mysql')
  , DATABASE = 'node_test'
  , TABLE = 'friends_test'
  , client = mysql.createClient({
      user: 'root'
    , password: 'root'
  });

 var apikey = "d4f7c8cf4b043c224a43aee5dbb3528f";


client.query('USE ' + DATABASE);

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
 

  var Room = io
    .of('/room')
    .on('connection', function(socket) { 
      var joinedRoom = null;
      Game.setCnt();
      console.log('접속함');
      socket.on('join', function(data) {
        if (Chat.hasRoom(data.roomName)) {
          joinedRoom = data.roomName;
          socket.join(joinedRoom);
        
            var name = data.nickName;

          socket.emit('joined', {
            isSuccess:true, nickname:name
          });
          socket.broadcast.to(joinedRoom).emit('joined', {
            isSuccess:true, nickname:name
          });
          Chat.joinRoom(joinedRoom, data.nickName, data.level);
        } else {
          socket.emit('joined', {isSuccess:false});
        }
      });
	 
//////////////////////////////////////////드라마 실시간 검색 값 요청 시/////////////////////////////////////////
	  socket.on('tvshow', function(data){
		    var query = "broadcast";
			var options = {
				host: 'openapi.naver.com',
				port: 80,
				path: '/search?key='+apikey+'&query='+query+'&display=2&start=1&target=ranktheme'
			};
		   var body = "";
		   http.get(options, function(response){
		   response.addListener('data', function(chunk){
               sys.debug("response...");
               body += chunk;
           });
          response.addListener('end', function(){
                 sys.debug("end...");
				 socket.emit('tvshowed', {xData: body});  
            });}).on('error', function(e) {console.log("Got error: " + e.message);});
	  });
//////////////////////////////////////////책 실시간 검색 값 요청 시/////////////////////////////////////////
	  socket.on('book', function(data){
		    var query = "book";
			var options = {
				host: 'openapi.naver.com',
				port: 80,
				path: '/search?key='+apikey+'&query='+query+'&display=2&start=1&target=ranktheme'
			};
		   var body = "";
		   http.get(options, function(response){
		   response.addListener('data', function(chunk){
               sys.debug("response...");
               body += chunk;
           });
          response.addListener('end', function(){
                 sys.debug("end...");
				 socket.emit('booked', {xData: body});  
            });}).on('error', function(e) {console.log("Got error: " + e.message);});
	  });
//////////////////////////////////////////드라마 실시간 검색 값 요청 시/////////////////////////////////////////
	  socket.on('drama', function(data){
		    var query = "drama";
			var options = {
				host: 'openapi.naver.com',
				port: 80,
				path: '/search?key='+apikey+'&query='+query+'&display=2&start=1&target=ranktheme'
			};
		   var body = "";
		   http.get(options, function(response){
		   response.addListener('data', function(chunk){
               sys.debug("response...");
               body += chunk;
           });
          response.addListener('end', function(){
                 sys.debug("end...");
				 socket.emit('dramaed', {xData: body});  
            });}).on('error', function(e) {console.log("Got error: " + e.message);});
	  });
//////////////////////////////////////////영화 실시간 검색 값 요청 시/////////////////////////////////////////
	  socket.on('movie', function(data){
		    var query = "movie";
			var options = {
				host: 'openapi.naver.com',
				port: 80,
				path: '/search?key='+apikey+'&query='+query+'&display=2&start=1&target=ranktheme'
			};
		   var body = "";
		   http.get(options, function(response){
		   response.addListener('data', function(chunk){
               sys.debug("response...");
               body += chunk;
           });
          response.addListener('end', function(){
                 sys.debug("end...");
				 socket.emit('movied', {xData: body});  
            });}).on('error', function(e) {console.log("Got error: " + e.message);});
	  });
//////////////////////////////////////////인물 실시간 검색 값 요청 시/////////////////////////////////////////
	  socket.on('man', function(data){
		    var query = "people";
			var options = {
				host: 'openapi.naver.com',
				port: 80,
				path: '/search?key='+apikey+'&query='+query+'&display=2&start=1&target=ranktheme'
			};
		   var body = "";
		   http.get(options, function(response){
		   response.addListener('data', function(chunk){
               sys.debug("response...");
               body += chunk;
           });
          response.addListener('end', function(){
                 sys.debug("end...");
				 socket.emit('maned', {xData: body});  
            });}).on('error', function(e) {console.log("Got error: " + e.message);});
	  });
//////////////////////////////////////////공연 실시간 검색 값 요청 시/////////////////////////////////////////
	  socket.on('perfomance', function(data){
		    var query = "perform";
			var options = {
				host: 'openapi.naver.com',
				port: 80,
				path: '/search?key='+apikey+'&query='+query+'&display=2&start=1&target=ranktheme'
			};
		   var body = "";
		   http.get(options, function(response){
		   response.addListener('data', function(chunk){
               sys.debug("response...");
               body += chunk;
           });
          response.addListener('end', function(){
                 sys.debug("end...");
				 socket.emit('perfomanced', {xData: body});  
            });}).on('error', function(e) {console.log("Got error: " + e.message);});
	  });



	  socket.on('s', function() {
		  var msg = '서버 사이드 메시지';
			socket.emit('sed', {msg: msg});
	  });

      socket.on('message', function(data) {
        if (joinedRoom) {
          socket.broadcast.to(joinedRoom).json.send(data);
        }
		else
			socket.broadcast.json.send(data);
			console.log('대기실에서 채팅/내용: '+data);
      });
	  socket.on('end', function(data) {
		  var roomName = data.roomName;
		 socket.emit('ended', {roomName:roomName});
		 socket.broadcast.to(joinedRoom).emit('ended', {roomName:roomName});
	  });

      socket.on('ready', function(data) { ////////////////////////////////////// ready.on
        Music.setMusic();
                console.log('Consol long : DB-> Music(hint, videoId, Name) created!!');
                var id = Music.getId();
                var name = Music.getName();
                var hint = Music.getHint();
                Game.increaseCnt();
                var cnt = Game.getCnt();

                                var Name = data.nickName;
                                var Score = data.usrScore;   
                                var Once = data.oneUserScore;

                                console.log(' in Room.js < onceUserScore: > '+Once);

        if (joinedRoom) {
                                        // DB에서 빼오는 부분임
                                        console.log('Consol long : readied event in Room!');
                                        socket.emit('readied', { usName: Name, usScore:Score, msId: id, msName: name, msHint: hint, msCnt: cnt, OneScore: Once   });
                    socket.broadcast.to(joinedRoom).emit('readied', {
             usName: Name, usScore:Score, msId: id, msName: name, msHint: hint, msCnt: cnt, OneScore: Once   
          });
          
        }
      });

	  socket.on('friendlist', function(data) {
		  console.log('이벤트 발생자:' + data.nickNmae);
		  console.log('친구 목록 요청 이벤트 발생 (서버에서 받음)');
           var name ='';

		    client.query( 'SELECT friend FROM ' + TABLE + ' WHERE nickname = ?' , [data.nickNmae], function(err, results, fields) {
            if (err) {
              throw err;
            }
			 name = results.friend; //친구 객체를 넘겨 준다.
			 console.log(results);

			 socket.emit('friendlisted', { usName: results});
      });
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


