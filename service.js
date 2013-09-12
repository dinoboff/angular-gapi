/* global angular */

angular.module('dinoboff.gapi', []).factory('dinoGapiClientLoader', function ($window, $q, $rootScope) {
    'use strict';
    
    return function(apiDetails) {
        var q = $q.defer();

        $window.gapi.load('auth:client', function () {
            if (!apiDetails || !apiDetails.name) {
                q.resolve($window.gapi);
                $rootScope.$apply();
                return;
            }

            $window.gapi.client.load(
                apiDetails.name,
                apiDetails.version,
                function () {
                    q.resolve($window.gapi);
                    $rootScope.$apply();
                },
                apiDetails.root
            );
        });

        return q.promise;
    };
}).factory('dinoGapiOAuth2', function ($rootScope, $q, dinoGapiClientLoader) {
    'use strict';

    var api = {
        gapi: null,
        accessToken: null,
        idToken: null,
        config: {scopes: '', clientId: ''},
        loader: dinoGapiClientLoader,
        login: function (mode) {
            /* jshint camelcase: false */

            var q = $q.defer();

            api.gapi.auth.authorize({
                client_id: api.config.clientId,
                scope: api.config.scopes,
                immediate: mode,
                response_type: 'token id_token'
            }, api.userAuthed.bind(q));

            return q.promise;
        },
        userAuthed: function () {
            api.gapi.client.oauth2.userinfo.get().execute(api._getUserInfo.bind(this));
        },
        _getUserInfo: function (resp) {
            /* jshint camelcase: false */

            if (!resp.code) {
                api.accessToken = api.gapi.auth.getToken();
                api.idToken = api.accessToken.id_token;
                api.gapi.auth.setToken(api.idToken);
                this.resolve(resp.result);
            } else {
                this.reject(resp.message);
            }
            $rootScope.$apply();
        }
    };

    return api.loader({name: 'oauth2', version: 'v2'}).then(function (gapi) {
        api.gapi = gapi;
        return api;
    });
});
