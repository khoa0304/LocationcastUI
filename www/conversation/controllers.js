var appControllers = angular.module('starter.controllers', [
		'starter.services', 'ngCordova' ]);

appControllers.controller('PostConversationsCtrl', [
		'PostConversationService',
		'LocationService',
		'$scope',
		'$http',
		'$rootScope',

		function(PostConversationService, LocationService, $scope, $http, $rootScope) {


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

				var submitResult = PostConversationService.
					PostConverseation($scope.content,$rootScope.longitude,$rootScope.latitude).then(
							
					  function(submitResult){
						  $scope.content = "";
					  },
					  function(error){
						  alert("Failed to submit conversation. Please ensure your location is available and submit again!");
					  }
					)
					
				
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
       'GetConversationService',
		'LocationService',
		'$scope',
		'$http',
		'$rootScope',
		function(GetConversationService,LocationService,$scope, $http, $rootScope) {


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
				
				GetConversationService.GetConverseation(conversationProximity).then(
						function(conversations) {
							$scope.conversations = conversations;
							$scope.$broadcast('scroll.refreshComplete');
				});
			};
		} ]);