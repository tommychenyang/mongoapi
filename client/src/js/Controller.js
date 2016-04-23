/**
 * Created by TommyChen on 4/8/2016.
 */
var controllers=angular.module('Controller',[]);
controllers.controller('listCtrl',['$scope','GundamRepo','Gundam','$location',function($scope,GundamRepo,Gundam,$location){
    $scope.content="blahblah";
    $scope.gundams=GundamRepo.query();
   // $scope.getdata=function(){
   //     $scope.selected=GundamRepo.get({id:'5707d49fedeafe982da7becd'});
   //     Gundam.set($scope.selected);
   // };
    $scope.goto=function(id){

        $location.path('/gundam/'+id);
    }
}])
.controller('dashboardCtrl',['$scope','GundamRepo','Gundam',function($scope,GundamRepo,Gundam){
        $scope.getdata=function(){
            $scope.selected=Gundam.data;

        };

    }])
.controller('gundamCtrl',['$scope',function($scope){

    }]);