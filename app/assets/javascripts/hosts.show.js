//= require lib/utils
//= require directives/commentForm
//= require directives/commentList

app.controller('HostShowController', ['$scope', '$http', function($scope, $http) {
	$scope.formatDateTime = formatDateTime;
	$scope.formatDate = formatDate;
	$scope.formatTime = formatTime;
	$scope.getAccesability = getAccesability;
	$scope.formatStrangers = formatStrangers;
	$scope.formatBool = formatBool;

	$scope.init = function(host) {
		$scope.host = host;
		$scope.comments = host.comments;

		if(host.invites && host.invites.length > 0) {
			initInvites(host.invites);
		}
	}

	$scope.deactivateHost = function() {
		var confirmed=confirm("בטוח בטוח?");
		if (!confirmed) return;
		$scope.success = false;
		$http.put('/hosts/' + $scope.host.id + '.json', {
  		deactivate: true
  	}).then(function success(response) {
  		$scope.success = true;
  		window.location.reload();
  	})
	}

	$scope.save = function() {
		$scope.success = false;
		$http.put('/hosts/' + $scope.host.id + '.json', {
  		host: {
				concept: $scope.host.concept,
				contacted: $scope.host.contacted,
				preparation_evening: $scope.host.preparation_evening,
				contacted_witness: $scope.host.contacted_witness,
				strangers: $scope.host.strangers,
				max_guests: $scope.host.max_guests
			}
  	}).then(function success(response) {
  		$scope.success = true; 
  	})
	}

	$scope.commentCallback = function(response) {
		$scope.comments.push(response.data);
	}

	$scope.updateInvite = function(invite, confirmedStatus) {
		var res = confirmedStatus ? true : confirm("האם אתה בטוח שאתה רוצה לבטל את בקשת ההתארחות?");
		if (res) {
			$http.put('/invites/' + invite.id + '.json', {
				invite: {
					confirmed: confirmedStatus
				}
	  	}).then(function success(response) {
	  		initInvites(response.data);
	  	})
		}
	}

	$scope.closeEvening = function() {
		$scope.host.strangers = false;
		$scope.save();
	}

	$scope.fbShare = function () {

  	FB.ui({
		method: 'share',
		mobile_iframe: true,
	  href: 'https://zikaronbasalonstaging.herokuapp.com/' + document.getElementById('locale').className + '/pages/home/'  + '?invite=' + $scope.host.id
		}, function(response){

		});
  };


	function initInvites(invites) {
		var invites = _.groupBy(invites, 'confirmed');
		$scope.pendingInvites = invites[false];
		$scope.confirmedInvites = invites[true];
	}
}]);