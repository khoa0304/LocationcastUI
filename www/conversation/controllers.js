var appControllers = angular.module('starter.controllers', [
		'starter.services', 'Authentication','ngCordova']);

appControllers.controller('ConversationsCtrl',[
                       						'Base64',
                    						'LocationService',
                    						'$scope',
                    						'$http',
                    						'$rootScope',
                    						
                    						function(Base64,LocationService, $scope, $http, $rootScope) {
                       							
	$scope.getLocation = function() {

		var latLong = LocationService.getLatLong().then(function(latLong) {
			$scope.latLong = latLong;
			console.log('LatLong=');
			console.log($scope.latLong);
		},

		function(error) {
			alert(error);
		})
	};

	$scope.postConversation = function() {

		var conversation = {};

		conversation.content = {};
		conversation.content.contentString = $scope.content;
		conversation.longAndLat = [
				$rootScope.longitude,
				$rootScope.latitude ];

		var authdata = Base64.encode("khoa0304" + ':'
				+ "welcome1");

		$http.defaults.headers.common['authorization'] = 'Basic '
				+ authdata;

		var responsePromise = $http
				.post(
						"/LocationCast/rest/conversation/create",
						conversation, {});

		responsePromise
				.success(function(dataFromServer,
						status, headers, config) {
					console
							.log("--> Submitting Conversation passed. Status "
									+ status);

					if (status == 201) {
						$scope.status = " Status code return "
								+ status;
					}

					
				});
				responsePromise.error(function(data, status,headers, config) {
					console.log("--> Submitting Conversation failed.");
				});
	};

}]);