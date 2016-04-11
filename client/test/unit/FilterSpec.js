/**
 * Created by TommyChen on 4/11/2016.
 */
describe('Filter test',function(){
    var $filter;
    beforeEach(function(){
        module('Filter');
        inject(function(_$filter_){
            $filter=_$filter_;
        });
    });
    it('returns 0 when given null', function() {
        var length = $filter('length');
        expect(length(null)).toEqual('0');
    });

    it('returns the correct value when given a string of chars', function() {
        var length = $filter('length');
        expect(length('abc')).toEqual('3');
    });


});