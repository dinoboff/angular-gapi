'use strict';


describe('Directive: dinoGapi', function(){
    beforeEach(module('dinoboff.gapi'));

    it('should be defined', inject(function(dinoGapi) {
        expect(dinoGapi).toBeDefined();
    }));
});
