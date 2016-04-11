/**
 * Created by TommyChen on 4/11/2016.
 */
var filter=angular.module('Filter',[]);
filter.filter('length',function(){

        return function(text){
            return (''+(text||'').length);
        };

});