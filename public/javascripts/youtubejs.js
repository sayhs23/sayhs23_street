
        // This function is called when an error is thrown by the player
        function getId() {
            var id = "vpFoRPGzDJc";
            return id;
        }
        function onPlayerError(errorCode) {
            alert("An error occured of type:" + errorCode);
        }

        // This function is automatically called by the player once it loads
        function onYouTubePlayerReady(playerId) {
            ytplayer = document.getElementById("ytPlayer");
            ytplayer.addEventListener("onError", "onPlayerError");
        }

        // The "main method" of this sample. Called when someone clicks "Run".
        function loadPlayer() {
            // The video to load	
            var videoID = getId();
            // Lets Flash from another domain call JavaScript
            var params = {
                allowScriptAccess: "always"
            };
            // The element id of the Flash embed
            var atts = {
                id: "ytPlayer"
            };
            // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
            swfobject.embedSWF("http://www.youtube.com/v/" + videoID
				+ "&enablejsapi=1&playerapiid=ytplayer", "videoDiv", "110",
				"110", "8", null, null, params, atts);
        }
        function _run() {
            loadPlayer();
        }
        function playVideo() {
            if (ytplayer) {
                ytplayer.playVideo();
            }
        }


