var cnt;

var Game = module.exports = {	
	setCnt: function (){
		cnt = 0;
	}
    ,getCnt: function () {
        return cnt;
    }
	,increaseCnt: function() {
		cnt++;
	}
}
