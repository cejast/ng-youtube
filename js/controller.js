var con = angular.module('youtube-controller', []);

con.controller('youtube-controller', ['$scope', function($scope, youtubePlayer){

	$scope.videos = ['5NV6Rdv1a3I', 'BnigNbYVQJE', 'AEoh-fPXMqc'];
	$scope.current = $scope.videos[0];
	$scope.index = 0;

	$scope.videoID = function(){
		return $scope.current;
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
	$scope.addvideo = function(){
		$scope.videos.push($scope.add);
		console.log($scope.add);
	}


	$scope.code = function(){
		return '<youtube id="' + $scope.current + '" width="' + $scope.width + '" height="' + $scope.height + '"></youtube>';
	}

}]);