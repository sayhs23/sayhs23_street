       var name;
		var hint;
		var id;
		var cnt;

var Music = module.exports = {
	
	setMusic: function() {
		var mysql = require('mysql');
        

		var client = mysql.createClient({
			user: 'root',
			password: 'root',
			database: 'node_test'
		});

		

		client.query('USE node_test');
		client.query('SELECT * FROM test2', function (error, result, fields) {
		

		if (error) {
				console.log('쿼리 중 오류 발생');
		} else {


			i = Math.ceil(Math.random()*25);

			name = result[i].name;
			id = result[i].id;
			hint = result[i].hint;
		 }
	});

	}

    ,getId: function () {
        return id;
    }
	,getName: function() {
		return name;
	}
	,getHint: function() {
		return hint;
	}
}

