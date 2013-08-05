angular.module('dinoboff.gapi', []).
    factory('dinoGapi', function ($window, $q, $rootScope) {
        var q = $q.defer();

        $window.gapi.load('auth:client', function(){
            q.resolve($window.gapi);
            $rootScope.$apply();
        });
        
        return q.promise;
    }).
    factory('dinoGapiClientLoader', function (dinoGapi, $rootScope) {
        return function(apiDetails, cb) {
            return dinoGapi.then(function(gapi){
                gapi.client.load(
                    apiDetails.name,
                    apiDetails.version,
                    function () {
                        cb(gapi);
                        $rootScope.$apply();
                    },
                    apiDetails.root
                );
                return gapi;
            });
        };
    });
