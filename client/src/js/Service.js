/**
 * Created by TommyChen on 4/8/2016.
 */
var services= angular.module('Service',['ngResource']);

services.factory('GundamRepo',['$resource',function($resource){

    return $resource('api/gundam/:id',{},{

        query:{method:'GET',isArray:true},
        get:{method:'GET',params:{id:''}}
    });
}]);
