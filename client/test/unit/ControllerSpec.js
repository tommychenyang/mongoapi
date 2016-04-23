/**
 * Created by TommyChen on 4/11/2016.
 */

"use strict";

describe("GundamApp Controller", function () {

    beforeEach(module('GundamApp'));

    describe("listCtrl",function(){

        var scope, ctrl,Gundamrepo;

        beforeEach(inject(function( $rootScope, $controller) {

            Gundamrepo={
                get: function(id){

                },
                query:function(){

                }
            };

            scope = $rootScope.$new();
            ctrl = $controller('listCtrl', {$scope: scope,GundamRepo:Gundamrepo});
        }));

        it("check initialization",function(){
            expect(scope.content).toEqual('blahblah');

        });

        it("should get data when service called",function(){
            spyOn(Gundamrepo, 'get').and.returnValue({name:'gundam',year:'1991'});
            scope.getdata();
           expect(typeof scope.selected).toEqual('object');
            expect(Gundamrepo.get).toHaveBeenCalled();
            //expect(result.name).toBeDefined();
        })
    });

});