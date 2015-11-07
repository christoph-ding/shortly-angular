//configurating the angular app, and creating dependencies
angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ngRoute'
  // 'shortly.testing'
])

// this is client side angular "routing" 
// what ISN"T HERE... is routing to the database
// all database routing / serving / data pushing / getting is handled by services.js

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    // Your code here
    .when('/', {
      templateUrl: 'app/auth/signin.html',
      controller: 'LinksController'
    })
    .when('/links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController'
    })
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})

/// this handles sessions

.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      // $location.path('/signin');

      // this is meant to bring you to signin when you are WRONG
      console.log('not auth!');
    } else {
      console.log('what is goingon')
    }
            
  });
})

// .controller('testController', function($scope) {
//   console.log("whoooooa");
//   $scope.message = "Test Controller is working"
// });

