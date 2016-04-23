/*! gundam-app - v1.0.0 -  
 *//**
 * Created by TommyChen on 4/8/2016.
 */
var controllers=angular.module('Controller',[]);
controllers.controller('listCtrl',['$scope','GundamRepo','Gundam','$location','$filter',function($scope,GundamRepo,Gundam,$location,$filter){
    $scope.content="blahblah";
    $scope.gundams=GundamRepo.query();
   // $scope.getdata=function(){
   //     $scope.selected=GundamRepo.get({id:'5707d49fedeafe982da7becd'});
   //     Gundam.set($scope.selected);
   // };
    $scope.goto=function(id){

        var selected=$filter('filter')($scope.gundams,{_id:id},true);

        if(selected.length>0)
        {
            Gundam.set( selected[0]);
            $location.path('/gundam/'+id);
        }
        else {
            throw "can not find with this id";
        }
    };
}])
.controller('dashboardCtrl',['$scope','GundamRepo','Gundam',function($scope,GundamRepo,Gundam){
        $scope.getdata=function(){
            $scope.selected=Gundam.data;

        };

    }])
.controller('gundamCtrl',['$scope','Gundam',function($scope,Gundam){
        $scope.Editing={
            name:Gundam.data.name,
            year:Gundam.data.year
        };
        console.log(Gundam.data);

        $scope.name=Gundam.data.name;
    }]);
/**
 * Created by TommyChen on 4/8/2016.
 */
var directives=angular.module('Directive',[]);
directives.directive('gundamBlock',function(){
  return{
      restrict:'EA',
      scope:{
          name:'=',
          year:'='
      },
      link:function(scope,ele,attr){
        ele.bind('click',function(e){
            e.preventDefault();
            event.stopPropagation();
        });
      },
      templateUrl:'partial/GundamBlock.tpl.html'

  };
});
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
services.factory('Gundam',function(){
   var factory={};
    factory.data={id:'',name:'',year:''};
    factory.set=function(d){
        this.data=d;
    };
    return factory;

});
services.factory('$exceptionHandler',['$injector', function($injector) {
    return function(exception, cause) {
      var rootscope= $injector.get('$rootScope');
        var logger=$injector.get('$log');
        rootscope.error.message=exception.message;
        rootscope.error.cause=cause;
        logger.error(exception.message);
    };
}]);
/**
 * Created by TommyChen on 4/8/2016.
 */

angular.module('GundamApp',['ngRoute','Controller','Directive','Service','Filter'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: 'partial/dashboard.html',
        controller:'dashboardCtrl'
    })
        .when('/list',{
            templateUrl:'partial/gundam-list.html',
            controller:'listCtrl'
        })
        .when('/gundam/:id',{
            templateUrl:'partial/gundam-view.html',
            controller:'gundamCtrl'
        })
        .otherwise({redirectTo:'/'});

    }]);