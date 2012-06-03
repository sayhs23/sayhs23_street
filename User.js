var nickName;
var onceScore;
var level;
var totalScore;

var User = module.exports = {
	getUser: function() {
		return this;
		
	}
	,User: function(nickName){
		this.nickName = nickName;
		this.onceScore = 0;
		this.totalScore = 0;
		console.log('\u001b[35m',' User.js -> User Object 생성'+ this.nickName);
		return this;
	}
	,getNickName: function() {
		return this.nickName;
	}
	,getOnceScore: function() {
		return this.onceScore;
	}
	,setOnceScore: function() {
		this.onceScore = 0;
	}
	,increaseOnceScore: function() {
		this.onceScore++;
	}
	,getTotalScore: function() {
		return this.totalScore;
	}
	,setLevel: function(level){
		this.level = level;
	}
	,getLevel: function() {
		return this.level;
	}
}