/**
 * Created by TommyChen on 4/12/2016.
 */
describe('Directives test',function(){

    var compile,rootscope,directiveElem;
    var $httpBackend;

    beforeEach(function(){
        module('GundamApp');
        inject(function(_$compile_,_$rootScope_,_$httpBackend_){
            compile=_$compile_;
            rootscope=_$rootScope_;
            $httpBackend=_$httpBackend_;
        });

        $httpBackend.when('GET').respond(200, '');
        directiveElem=getCompiledElement();

    });

    function getCompiledElement(){
        var element = angular.element('<div class="gundamblock"></div>');
        var compiledElement = compile(element)(rootscope);
        rootscope.$digest();
        return compiledElement;
    }
    it('should have a header element',function(){
        var headElem=directiveElem.find('h3');
        expect(headElem).toBeDefined();
    });
    it('should have a paragraph element',function(){
        var headElem=directiveElem.find('p');
        expect(headElem).toBeDefined();


    });

})