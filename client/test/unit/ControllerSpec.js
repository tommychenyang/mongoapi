/**
 * Created by TommyChen on 4/11/2016.
 */

"use strict";

describe("GundamApp Controller", function () {

    beforeEach(module('GundamApp'));

    describe("listCtrl",function(){

        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;


            scope = $rootScope.$new();
            ctrl = $controller('listCtrl', {$scope: scope});
        }));
        it("check initialization",function(){
            expect(scope.content).toEqual('blahblah');

        })
    });

});