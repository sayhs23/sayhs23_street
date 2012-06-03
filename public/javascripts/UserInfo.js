function UserInfo(nickName) {
	var nickName = nickName;
	var onceScore = 0 ;
	var level = 0;
	var totalScore = 0;

	alert(' 유저 정보 클래스 생성 완료'+nickName);

	this.getNickName = function() {
		alert(' [디버그] getNickName (UserInfo.js)'+nickName);
		return NickName;
	};
	this.getOnceScore = function() {
		return this.OnceScore;
	};
	this.getTotalScore = function() {
		return this.totalScore;
	};
	this.getLevel = function() {
		return this.level;
	};
}