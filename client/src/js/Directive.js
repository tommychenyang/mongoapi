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
      templateUrl:'partial/GundamBlock.tpl.html'

  };
});