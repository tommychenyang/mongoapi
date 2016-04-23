/**
 * Created by TommyChen on 4/8/2016.
 */
var controllers=angular.module('Controller',[]);
controllers.controller('listCtrl',['$scope','GundamRepo',function($scope,GundamRepo){
    $scope.content="blahblah";
    $scope.gundams=GundamRepo.query();
    $scope.getdata=function(){
        $scope.selected=GundamRepo.get({id:'5707d49fedeafe982da7becd'});

    };
}])
.controller('dashboardCtrl',['$scope','GundamRepo',function($scope,GundamRepo){
        $scope.getdata=function(){
            $scope.selected=GundamRepo.get({id:'5707d49fedeafe982da7becd'});

        };

    }]);