'use strict';


describe('Service: dinoGapiClientLoader', function(){
    var gapi;


    beforeEach(module('dinoboff.gapi'));

    beforeEach(inject(function($window) {
        // mock gapi.load
        gapi = $window.gapi = jasmine.createSpyObj('gapi', ['load']);
        gapi.client = jasmine.createSpyObj('client', ['load']);
    }));
	
    it('should load auth and client library', inject(function(dinoGapiClientLoader) {
        dinoGapiClientLoader();
        expect(gapi.load.mostRecentCall.args[0]).toBe('auth:client');
    }));

    it('should load google endpoint', inject(function(dinoGapiClientLoader) {
        var apiDetails={
            name: 'guestbook',
            version: 'v1',
            root: 'http://localhost:8080/_ah/api'
        };

        dinoGapiClientLoader(apiDetails);

        gapi.load.mostRecentCall.args[1](); // similate gapi loaded and cb called
        expect(gapi.client.load.mostRecentCall.args[0]).toBe(apiDetails.name);
        expect(gapi.client.load.mostRecentCall.args[1]).toBe(apiDetails.version);
        expect(gapi.client.load.mostRecentCall.args[3]).toBe(apiDetails.root);

    }));

    it('should not try to load a endpoint if no details are given', inject(function(dinoGapiClientLoader) {
        dinoGapiClientLoader();
        gapi.load.mostRecentCall.args[1](); // similate gapi loaded and cb called

        expect(gapi.client.load).not.toHaveBeenCalled();
    }));

    it('should return a promise resolving to gapi', inject(function(dinoGapiClientLoader) {
        var p = dinoGapiClientLoader(), resolvedValue;

        expect(p.then).toBeDefined();

        p.then(function (gapi) {
            resolvedValue = gapi;
        });

        gapi.load.mostRecentCall.args[1](); // similate gapi loaded and cb called
        expect(resolvedValue).toBe(gapi);
    }));

    it('should return a promise resolving to gapi when loading an endpoint', inject(function(dinoGapiClientLoader) {
        var p = dinoGapiClientLoader({name: 'guestbook'}), resolvedValue;

        expect(p.then).toBeDefined();

        p.then(function (gapi) {
            resolvedValue = gapi;
        });

        gapi.load.mostRecentCall.args[1](); // similate gapi loaded and cb called
        gapi.client.load.mostRecentCall.args[2]();
        expect(resolvedValue).toBe(gapi);
    }));
    
});
