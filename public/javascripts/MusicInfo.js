 function MusicInfo(ids, names, hints) {
        var id = ids;
        var name = names;
        var hint = hints;

		alert('생성 완료');
        this.getId = function () { 
			alert('get id 호출');
			return id;
		};
        this.getName = function () {
			alert('get name 호출');
			return name; 
		};
        this.getHint = function () {
			alert('get hint 호출');
			return hint; 
		};
        this.setId = function (value) {
			alert('set Id 호출');
            id = value;
        };
        this.setName = function (value) {
			alert('set Name 호출');
            name = vlaue;
        };
        this.setHint = function (value) {
			alert('set Hint 호출');
            hint = value;
        };
   }