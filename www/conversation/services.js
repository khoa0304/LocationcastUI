var starterService = angular.module('starter.services', ['Authentication']);

starterService.factory('LocationService', function($q, $cordovaGeolocation,
		$rootScope) {

	var latLong = null;

	$rootScope.longitude;
	$rootScope.latitude;

	return {
		
		  getLatLong : function() {
	
			var deferred = $q.defer();
	
			if (latLong === null) {
	
				console.log('Getting lat long');
				$cordovaGeolocation.getCurrentPosition().then(function(pos) {
					console.log('Position=')
					console.log(pos);
					latLong = {
						'Longitude: ' : pos.coords.longitude,
						'Latitude: ' : pos.coords.latitude
					}
	
					$rootScope.longitude = pos.coords.longitude;
					$rootScope.latitude = pos.coords.latitude;
					deferred.resolve(latLong);
	
				}, function(error) {
					console.log('Got error!');
					console.log(error);
					latLong = null
	
					deferred.reject('Failed to Get Longitude and Latitude')
	
				});
	
			} else {
				deferred.resolve(latLong);
			}
	
			return deferred.promise;
		},
		
	}
	
});

starterService.factory('GetConversationService',['AuthenticationService','$http','$rootScope',
                                                 function(AuthenticationService,$http, $rootScope) {
	var BASE_URL = "/LocationCast/rest/conversation/load/";

	var conversations = [];

	return {
		GetConverseation : function(conversationProximity) {

			AuthenticationService.SetCredentials("khoa0304", "welcome1");
			
			return $http.get(
					BASE_URL + $rootScope.longitude + "/" + $rootScope.latitude
							+ "/" +conversationProximity+"/").then(function(response) {
				conversations = response.data;
				return conversations;
			});
		}// ,

	}
}]);

starterService.factory('PostConversationService',['AuthenticationService','$http','$q',
                                                  function(AuthenticationService,$http,$q) {


	return {
	
		PostConverseation : function(content,longitude,latitude) {
			
			
			
			var deferred = $q.defer();
			
			var submitResult = false; 
			
			var conversation = {};

			conversation.content = {};
			conversation.content.contentString = content;
			conversation.longAndLat = [longitude,latitude];

			AuthenticationService.SetCredentials("khoa0304", "welcome1");
		
			var responsePromise = $http.post("/LocationCast/rest/conversation/create", conversation,{});

			responsePromise.success(function(dataFromServer, status,
					headers, config) {
			
				if (status == 201) {
					console.log("--> Submitting Conversation passed. Status ");
				}

				submitResult = true;
				
				deferred.resolve(submitResult);
			});
		
			responsePromise.error(function(data, status, headers, config) {
				console.log("--> Submitting Conversation failed.");
				
				submitResult = false;
				
				deferred.reject(submitResult);
			});
			
			return deferred.promise;
	
		 }
				
		}
		
}]);