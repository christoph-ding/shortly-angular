angular.module('shortly.links', [])
.controller('LinksController', function ($scope) {
  // Your code here
  $scope.message = 'do you see me?';
})
.controller('second', function($scope){
  alert('you clicked! time to make request!');
  $scope.message = 'do you see me?';
})


//by defining controllers here, they will oversee the entire scope
//regarless where you use the controller.
