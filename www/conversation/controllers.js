var appControllers = angular.module('starter.controllers', [
		'starter.services', 'Authentication', 'ngCordova' ]);

appControllers.controller('PostConversationsCtrl', [
		'AuthenticationService',
		'LocationService',
		'$scope',
		'$http',
		'$rootScope',

		function(AuthenticationService, LocationService, $scope, $http, $rootScope) {

			
			$scope.getLocation = function() {

				var latLong = LocationService.getLatLong().then(
						function(latLong) {
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
				conversation.longAndLat = [ $rootScope.longitude,
						$rootScope.latitude ];

				AuthenticationService.SetCredentials("khoa0304", "welcome1");
			
				var responsePromise = $http.post(
						"/LocationCast/rest/conversation/create", conversation,
						{});

				responsePromise.success(function(dataFromServer, status,
						headers, config) {
					console.log("--> Submitting Conversation passed. Status "
							+ status);

					if (status == 201) {
						$scope.status = " Status code return " + status;
					}

					$scope.content = "";
				});
				responsePromise.error(function(data, status, headers, config) {
					console.log("--> Submitting Conversation failed.");
				});
			};

			$scope.isPostButtonDisabled = function() {
				if ($scope.content == "" || $rootScope.longitude == undefined) {
					return true;
				} else {
					return false;
				}
			}

		} ]);

appControllers.controller('ListConversationsCtrl', [
        'AuthenticationService',
		'GetConversationService',
		'LocationService',
		'$scope',
		'$http',
		'$rootScope',
		

		function(AuthenticationService,GetConversationService,LocationService,$scope, $http, $rootScope) {


			$scope.doRefresh = function() {

				$scope.conversations = [];
				var conversationProximity = $scope.conversationProximity;
				
				if ($rootScope.longitude == undefined || $rootScope.latitude == undefined){
					$scope.getLocation(conversationProximity);
				}
				
				else{
					$scope.getConversation(conversationProximity);
				}
				
				
			};
			
			$scope.getLocation = function(conversationProximity) {

				var latLong = LocationService.getLatLong().then(
						function(latLong) {
						
							$scope.latLong = latLong;
							console.log('LatLong=');
							console.log($scope.latLong);
							$scope.getConversation(conversationProximity);
						},

						function(error) {
							alert(error);
							
						})
			};


			$scope.getConversation = function(conversationProximity){

	        	AuthenticationService.SetCredentials("khoa0304", "welcome1");
	        	
				GetConversationService.GetConverseation(conversationProximity).then(
						function(conversations) {
							$scope.conversations = conversations;
							$scope.$broadcast('scroll.refreshComplete');
				});
			};
		} ]);