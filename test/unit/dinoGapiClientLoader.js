'use strict';


describe('Service: dinoGapiClientLoader', function(){
	var gapiPromise, gapi;

    beforeEach(function(){
        module('dinoboff.gapi');

        module(function($provide) {
            gapiPromise = jasmine.createSpyObj('promise', ['then']);

            $provide.value('dinoGapi', gapiPromise);
        });

        inject(function($q, $rootScope) {
            var d = $q.defer();

            gapi = {
                'client': jasmine.createSpyObj('client', ['load'])
            };

            gapiPromise.then.andCallFake(d.promise.then);

            d.resolve(gapi);
            $rootScope.$apply();
        });
    });


    it('should call gapi.client.load', inject(function(dinoGapiClientLoader, $rootScope) {
        var apiName='your_api_name',
            apiVersion='v1',
            root='http://foo.appspot.com/_ah/api';

        dinoGapiClientLoader({
            name: apiName,
            version: apiVersion,
            root: root
        });

        $rootScope.$apply();
        expect(gapi.client.load.mostRecentCall.args[0]).toBe(apiName);
        expect(gapi.client.load.mostRecentCall.args[1]).toBe(apiVersion);
        expect(gapi.client.load.mostRecentCall.args[3]).toBe(root);
    }));

    it('should send gapi to the loader callback', inject(function(dinoGapiClientLoader, $rootScope) {
        var apiName='your_api_name',
            apiVersion='v1',
            root='http://foo.appspot.com/_ah/api',
            loadedApi,
            cb=function (gapi) {
                loadedApi = gapi;
            };

        dinoGapiClientLoader({
            name: apiName,
            version: apiVersion,
            root: root
        }).then(cb);

        $rootScope.$apply();
        gapi.client.load.mostRecentCall.args[2](); // gapi.client.load is done and call the callback function
        expect(loadedApi).toBe(gapi);
    }));

});
