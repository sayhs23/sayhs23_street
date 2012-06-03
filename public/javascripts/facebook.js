//페이스북 초기화
		    window.fbAsyncInit = function () {
		        FB.init({ appId: '329848417083431', status: true, cookie: true, xfbml: true });
		    };
		    (function () {
		        var e = document.createElement('script');
		        e.type = 'text/javascript';
		        e.src = document.location.protocol +
				'//connect.facebook.net/ko_KR/all.js';
		        e.async = true;
		        //document.getElementById('fb-root').appendChild(e);
		    }());

		    //ID에 대한 사용자 정보 출력
		    function showUserInfo(id) {
		        FB.api({
		            method: 'fql.query',
		            query: 'SELECT name, pic_square FROM user WHERE uid=' + id
		        }, function (response) {
		            document.getElementById('userInfo').innerHTML += (
					'<img src="' + response[0].pic_square + '"> ' + response[0].name
				  );
		        });
		    }

		    //포스팅 다이얼로그
		    function dial() {
		        FB.ui({
		            method: 'feed',
		            name: document.title,
		            link: document.URL,
		            picture: 'http://penil.net/images/logo.gif',
		            caption: 'title',
		            description: 'content',
		            //message: 'Facebook Dialogs are easy!'	//텍스트박스 안의 글자
		        }, function (response) {
		            if (response && response.post_id) {
		                //alert('Post was published.');
		            } else {
		                //alert('Post was not published.');
		            }
		        });
		    }