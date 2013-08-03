'use strict';


describe('Service: dinoGapi', function(){
	var gapi;

    beforeEach(module('dinoboff.gapi'));

    beforeEach(inject(function($window) {
        // mock gapi.load
        gapi = $window.gapi = jasmine.createSpyObj('gapi', ['load']);
    }));

    it('should be load google auth and client libary', inject(function(dinoGapi) {
        var libs, components=[];

        expect(dinoGapi).toBeDefined();
        expect(gapi.load).toHaveBeenCalled();
            
        libs = gapi.load.mostRecentCall.args[0].split(',');
        for (var i = 0; i < libs.length; i++) {
            var comps = libs[i].split(':');
            for (var j = 0; j < comps.length; j++) {
                components.push(comps[j]);
            }
        }

        expect(components).toContain('auth');
        expect(components).toContain('client');
    }));

    it('should return a promise that resolve to gapi', inject(function(dinoGapi, $rootScope) {
        var loadCb = gapi.load.mostRecentCall.args[1],
            resolvedValue;

        dinoGapi.then(function(gapi){
            resolvedValue = gapi;
        });

        loadCb();
        $rootScope.$apply();

        expect(resolvedValue).toBe(gapi);
    }));
});
