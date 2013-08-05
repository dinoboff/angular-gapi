angular.module('dinoboff.gapi', []).
    factory('dinoGapi', function ($window, $q, $rootScope) {
        var q = $q.defer();

        $window.gapi.load('auth:client', function(){
            q.resolve($window.gapi);
            $rootScope.$apply();
        });
        
        return q.promise;
    }).
    factory('dinoGapiClientLoader', function (dinoGapi, $q, $rootScope) {
        return function(apiDetails) {
            var q = $q.defer();

            dinoGapi.then(function(gapi){
                gapi.client.load(
                    apiDetails.name,
                    apiDetails.version,
                    function () {
                        q.resolve(gapi);
                        $rootScope.$apply();
                    },
                    apiDetails.root
                );
            });

            return q.promise;
        };
    });
