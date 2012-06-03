var roomName;
var captin;
var maxUsers;
var maxMusicNumber;
var nowUsers;
var attendants = [];

var Room = module.exports = {
	getRoom: function() {
		return this;
		
	}
	,Room: function(roomName, captin, maxUsers, maxMusicNumber){
		this.roomName = roomName;
		this.captin = captin;
		this.maxUsers = maxUsers;
		this.maxMusicNumber = maxMusicNumber;
		this.nowUsers = 1; //처음 방을 만들기 위해선 한 명이 반드시 필요하므로 1로 초기화 시킨다.
		this.attendants = []; // 해당 방의 참가자 목록을 다루기 위한 참가자 배열. 

		console.log('\u001b[35m',' Room.js -> Room Object 생성'+ this.roomName);
		return this;
	}
	,getRoomName: function() {
		return this.roomName;
	}
	,getCaptin: function() {
		return this.captin;
	}
	,setMaxUsers: function(val) {
		this.maxUsers = val;
	}
	,increaseUsers: function() {
		this.nowUsers++;
	}
	,getMaxMusicNumber: function() {
		return this.maxMusicNumber;
	}
	,decreaseUsers: function(){
		this.nowUsers--;
	}
	,setCaptin: function(captin) {
		this.captin = captin;
	}
	, resetRoom: function(val){
		this.maxMusicNumber = val;
	}
	, addUser: function(user){
		this.attendants.push(user);
	}
	,getAttendants: function() {
		this.attendats;
	}
}