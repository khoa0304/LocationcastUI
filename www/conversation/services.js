var starterService = angular.module('starter.services', []);

starterService.factory('LocationService', function($q, $cordovaGeolocation,
		$rootScope) {

	var latLong = null;

	$rootScope.longitude;
	$rootScope.latitude;

	var getLatLong = function() {

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

				deferred.reject('Failed to Get Lat Long')

			});

		} else {
			deferred.resolve(latLong);
		}

		return deferred.promise;

	};

	return {

		getLatLong : getLatLong

	}
});

starterService.factory('GetConversationService', function($http, $rootScope) {
	var BASE_URL = "/LocationCast/rest/conversation/load/";

	var conversations = [];

	return {
		GetConverseation : function(conversationProximity) {

			return $http.get(
					BASE_URL + $rootScope.longitude + "/" + $rootScope.latitude
							+ "/" +conversationProximity+"/").then(function(response) {
				conversations = response.data;
				return conversations;
			});
		}// ,

	}
});