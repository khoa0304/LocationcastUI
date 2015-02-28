angular.module('starter.services', [])

.factory('LocationService', function($q,$cordovaGeolocation,$rootScope) {
    
    var latLong = null;
    
    $rootScope.longitude;
    $rootScope.latitude;
    
    var getLatLong = function() {
        
        var deferred = $q.defer();
        
        
        if( latLong === null) {
        
            console.log('Getting lat long');
            $cordovaGeolocation
            .getCurrentPosition()
            .then(function (pos) {
                console.log('Position=')
                console.log(pos);
                latLong =  { 'Longitude: ' : pos.coords.longitude, 'Latitude: ' : pos.coords.latitude }
                
                $rootScope.longitude = pos.coords.longitude;
                $rootScope.latitude = pos.coords.latitude;
                deferred.resolve(latLong);

            }, function(error) {
                console.log('Got error!');
                console.log(error);
                latLong = null
                
                deferred.reject('Failed to Get Lat Long')

            });
            
        }  else {
            deferred.resolve(latLong);
        }
        
        return deferred.promise;

    };      
    
    return {
        
        getLatLong : getLatLong
        
    }
})