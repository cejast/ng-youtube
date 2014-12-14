var dir = angular.module('youtube-directive', ['youtube-service']);

dir.directive('youtube', ['youtubeEmbed', '$window', '$interval', function(youtubeEmbed, $window, $interval){
	return {
		restrict: 'E',
		template: '<div id="player"></div>',
		scope: {
				state: '=',
				currentTime: '='
		},
		link: function(scope, element, attrs){
			//scope.playerState = 
			scope.currentTime = 0;
			youtubeEmbed.yt().then(function(yt){
				$window.onYouTubePlayerAPIReady = function(){
					scope.createPlayer = function(attrs){
						if(scope.player) 
							scope.player.destroy();
						var controls = (attrs.controls) ? attrs.controls : 1;
						var autoplay = (attrs.autoplay) ? attrs.autoplay : 0;
						var player = new YT.Player('player', {
							height: attrs.height,
							width: attrs.width,
							videoId: attrs.id,
							playerVars: { 'autoplay': autoplay, 'controls': controls },
						});
						player.addEventListener("onStateChange", function(state){
							console.log("state", state);
							if(state.data==1){
								scope.timer = $interval(function(){
									if(scope.player)
									scope.currentTime = scope.player.getCurrentTime();
								}, 250);
							}else{
								if(scope.timer){
									$interval.cancel(scope.timer);
								}
							}
						});
						return player;
					}
					scope.player = scope.createPlayer(attrs);

					scope.$watch(function(){ return attrs.id;}, function(newVal){
						var videoId = newVal;
						scope.player = scope.createPlayer(attrs);
					});

					scope.$on('$destroy', function() {
			          // Make sure that the interval is destroyed too
			          if(scope.timer){
			          	$interval.cancel(scope.timer);
			          	scope.timer = null;
			          }
			        });

				}
			});
		}
	};
}]);
