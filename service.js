angular.module('dinoboff.gapi', []).
    factory('dinoGapiClientLoader', function ($window, $q, $rootScope) {
        return function(apiDetails) {
            var q = $q.defer();

            $window.gapi.load('auth:client', function(){
                if (!apiDetails || !apiDetails.name ) {
                    q.resolve($window.gapi);
                    $rootScope.$apply();
                    return;
                }

                $window.gapi.client.load(
                    apiDetails.name,
                    apiDetails.version,
                    function() {
                        q.resolve($window.gapi);
                        $rootScope.$apply();
                    },
                    apiDetails.root
                );
            });

            return q.promise;
        };
    });
