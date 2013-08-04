angular.module('dinoboff.gapi', []).
    factory('dinoGapi', function ($window, $q) {
        var q = $q.defer();

        $window.gapi.load('auth:client', function(){
            q.resolve($window.gapi);
        });
        
        return q.promise;
    }).
    factory('dinoGapiClientLoader', function (dinoGapi) {
        return function(apiDetails, cb) {
            return dinoGapi.then(function(gapi){
                gapi.client.load(
                    apiDetails.name,
                    apiDetails.version,
                    function () {
                        cb(gapi);
                    },
                    apiDetails.root
                );
                return gapi;
            });
        };
    });
