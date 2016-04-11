/*! gundam-app - v1.0.0 -  
 *//**
 * Created by TommyChen on 4/8/2016.
 */
var controllers=angular.module('Controller',[]);
controllers.controller('listCtrl',['$scope','GundamRepo',function($scope,GundamRepo){
    $scope.content="blahblah";
    $scope.gundams=GundamRepo.query();
    $scope.getdata=function(){
        $scope.selected=GundamRepo.get({id:'5707d49fedeafe982da7becd'});

    };
}]);
/**
 * Created by TommyChen on 4/8/2016.
 */
var directives=angular.module('Directive',[]);

/**
 * Created by TommyChen on 4/11/2016.
 */
var filter=angular.module('Filter',[]);
filter.filter('length',function(){

        return function(text){
            return (''+(text||'').length);
        };

});
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

/**
 * Created by TommyChen on 4/8/2016.
 */

angular.module('GundamApp',['ngRoute','Controller','Directive','Service','Filter'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: 'partial/gundam-list.html',
        controller:'listCtrl'
    })
        .otherwise({redirectTo:'/'});

    }]);