var dir = angular.module('youtube-directive', ['youtube-service']);

dir.directive('youtube', ['youtubeEmbed', '$window', function(youtubeEmbed, $window){
	return {
		restrict: 'E',
		template: function(scope, element, attrs){
			return '<div id="player"></div>'
		},
		link: function(scope, element, attrs){
			youtubeEmbed.yt().then(function(yt){
				$window.onYouTubePlayerAPIReady = function(){
					scope.player = new YT.Player('player', {
						height: attrs.height,
						width: attrs.width,
						videoId: attrs.id
					});

					scope.$watch(function(){ return attrs.id;}, function(newVal){
						var videoId = newVal;
						console.log(videoId);
						scope.player = scope.createPlayer(attrs);
					});

					scope.createPlayer = function(attrs){
						if(scope.player) scope.player.destroy();
						return new YT.Player('player', {
							height: attrs.height,
							width: attrs.width,
							videoId: attrs.id
						});
					}

				}

			});
		}
	};
}]);