//= require lib/utils

app.controller('HostShowController', ['$scope', '$http', function($scope, $http) {
	$scope.formatDateTime = formatDateTime;
	$scope.formatDate = formatDate;
	$scope.formatTime = formatTime;
	$scope.getAccesability = getAccesability;
	$scope.formatStrangers = formatStrangers;
	$scope.formatBool = formatBool;

	$scope.init = function(host) {
		$scope.host = host;
	}

	$scope.back = function() {
		window.history.back();
	}

	$scope.save = function() {
		$scope.success = false;
		$http.put('/hosts/' + $scope.host.id + '.json', {
  		host: {
				concept: $scope.host.concept,
				contacted: $scope.host.contacted,
			}
  	}).then(function success(response) {
  		$scope.success = true; 
  	})
	}

}]);