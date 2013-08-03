angular.module('dinoboff.gapi', []).
    factory('dinoGapi', function ($window, $q) {
        var q = $q.defer();

        $window.gapi.load('auth:client', function(){
            q.resolve($window.gapi);
        });
        
        return q.promise;
    });
