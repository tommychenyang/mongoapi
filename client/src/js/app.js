/**
 * Created by TommyChen on 4/8/2016.
 */

angular.module('GundamApp',['ngRoute','Controller','Directive','Service','Filter'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: 'partial/dashboard.html',
        controller:'listCtrl'
    })
        .when('/list',{
            templateUrl:'partial/gundam-list.html',
            controller:'dashboardCtrl'
        })
        .otherwise({redirectTo:'/'});

    }]);