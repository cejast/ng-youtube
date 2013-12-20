var ser = angular.module('youtube-service', []);

ser.factory('youtubeEmbed', ['$document', '$q', '$rootScope', function($document, $q, $rootScope){

	var y = $q.defer();

	function onScriptLoad(){
		y.resolve(window.yt);
	}

	var scriptTag = $document[0].createElement('script');
	scriptTag.type = 'text/javascript';
	scriptTag.async = true;
	scriptTag.src = 'https://www.youtube.com/player_api';
	scriptTag.onreadystatechange = function(){
		if(this.readyState == 'complete')
			onScriptLoad();
	}
	scriptTag.onload = onScriptLoad();

	var s = $document[0].getElementsByTagName('body')[0];
	s.appendChild(scriptTag);

	return {
		yt: function(){ return y.promise; }
	};

}]);