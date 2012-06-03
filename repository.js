Chat = require('./chat');

var mysql = require('mysql')
  , DATABASE = 'node_test'
  , TABLE = 'members_test'
  , client = mysql.createClient({
      user: 'root'
    , password: 'root'
  });

client.query('USE ' + DATABASE);

var mysqlUtil = module.exports = {
    insertUser: function(user, res) {
      client.query(
          'INSERT INTO ' + TABLE + ' SET nickname = ?, name = ?, password = ?, email = ?, level = ?, totalscore = ?'
        , [user.nickname, user.name, user.password, user.email, 'low', '0']
        , function(err) {
            client.query(
                'SELECT * FROM ' + TABLE + ' WHERE nickname = ?'
              , [user.nickname]
              , function(err, results, fields) {
                  if (err) {
                    throw err; 
                  } 
                  res.render('join-result', {
					  usernickname: results[0].nickname
                    , username: results[0].name
					, userpassword: results[0].email
                    , useremail: results[0].email
                    , userlevel: results[0].level
				    , usertotalscore: results[0].totalscore
                    , title: 'Express'
                  });
            });
          }
      );
    }
   , checkNickName: function(req, res) {
	   var isSuccess = false
    , nickname = req.body.nickname;

      client.query(
          'SELECT * FROM ' + TABLE + ' WHERE nickname = ?'
        , [ req.body.nickname]
        , function(err, results, fields) {
            if (err) {
              throw err;
            }
            if (results[0].password ==  req.body.password) {
				console.log('아이디랑 비밀 번호가 같다');
				 if (!Chat.hasUser(nickname)) {
						 
						 req.session.nickname =nickname;
						 console.log('세션 값'+JSON.stringify(req.session));
						 isSuccess = true;  
				 
						 var level = results[0].level;
						 var totalscore = results[0].totalscore;
						 var name = results[0].name;
						 var email = results[0].email;

						 console.log('\u001b[36m', '  hasNickName() 함수 = /enter.post방식 ');
					     console.log('\u001b[36m', '  -> session.nickname =  '+req.session.nickname);

					     Chat.addUser(nickname, name, email, level, totalscore);                    //세션에 추가.
						 Chat.addWaitUser(nickname, name, email, level, totalscore);         

				 }
				 

				 res.render('enter', {
					    isSuccess: isSuccess 
                      , level: level
					  , totalscore: totalscore
					  , name: name
					  , email: email
					  , nickname: req.session.nickname
					  , level: level
					  , totalscore: totalscore
     			      , roomList: Chat.getRoomList()
					  , roomInfo: Chat.getRoomInfo()
                      , waitUser: Chat.getWaitUserList()
					  ,title: 'Express'

				 });
           } else {
				res.render('login-fail', {
			        title: 'Express'
              });
              console.log('아이디랑 비밀 번호가 다르다.');
           }
      });
    }
  , hasFriend: function(req, res) {
	  client.query(
          'SELECT * FROM  friends_test WHERE nickname = ?'
        , [req.body.nickname]
        , function(err, results, fields) {
            if (err) {
              throw err;
            }
            if (results.length > 0) {
              res.render('friendsList', {
				   friend:result[0].friend
                  ,title: 'Express'
              });
            } else {
              console.log('등록 된 친구가 없습니다.');
            }
      });
    }
  , hasNickName: function(user, res) {
      client.query(
          'SELECT * FROM ' + TABLE + ' WHERE nickname = ?'
        , [user.nickname]
        , function(err, results, fields) {
            if (err) {
              throw err;
            }
            if (results.length > 0) {
              res.render('join-fail', {
                  title: 'Express'
              });
            } else {
              mysqlUtil.insertUser(user, res);
            }
      });
    }
};
