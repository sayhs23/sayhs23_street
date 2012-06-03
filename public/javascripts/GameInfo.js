function GameInfo() {
	var cnt = 0;

	alert('게임 정보 생성 완료');

	this.getCnt = function() {
		return cnt;
	};
	this.increateCnt = function() {
		cnt++;
	};
