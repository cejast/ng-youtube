var con = angular.module('youtube-controller', []);

con.controller('youtube-controller', ['$scope', function($scope, youtubePlayer){

	$scope.videos = [
		{
			id: '5NV6Rdv1a3I',
			showControls: 0,
			autoplay: 1
		}, 
		{
			id: 'BnigNbYVQJE',
			showControls: 1,
			autoplay: 0
		}, 
		{
			id: 'AEoh-fPXMqc',
			showControls: 0,
			autoplay: 1
		}];
	$scope.current = $scope.videos[0];
	$scope.index = 0;

	$scope.videoID = function(){
		return $scope.current.id;
	}

	$scope.nextVideo = function(){
		$scope.index = ($scope.index + 1) % $scope.videos.length;
		$scope.current = $scope.videos[$scope.index];
	}

	$scope.width = 640;
	$scope.height = 360;

	$scope.go = function(){
		$scope.nextVideo();
	}

	$scope.add = '';
	$scope.showControls = 0;
	$scope.autoplay = 0;
	$scope.addvideo = function(){
		$scope.videos.push({ 
			id: $scope.add,
			showControls: $scope.showControls,
			autoplay: $scope.autoplay
		});
	}
	$scope.remove = function(video){
		$scope.videos.splice($scope.videos.indexOf(video), 1);
	}


	$scope.code = function(){
		return '<youtube id="' + $scope.current.id + '" width="' + $scope.width + '" height="' + $scope.height + '" controls="' + $scope.current.showControls + '"></youtube>';
	}

}]);