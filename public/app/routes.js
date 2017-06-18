'use strict';

const app = angular.module('appRoutes', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'public/app/views/index.html'
  })

  .when('/register', {
    templateUrl: 'public/app/views/pages/users/register.html',
    controller: 'regCtrl',
    controllerAs: 'register',
  })

  .when('/login', {
    templateUrl: 'public/app/views/pages/users/login.html',
  })

  .when('/profile', {
    templateUrl: 'public/app/views/pages/users/profile.html',
  })

  .when('/vrfeed', {
    templateUrl: 'public/app/views/pages/vr/vr-feed.html',
    controller: 'MainMenuCtrl'
  })

  .when('/image', {
    templateUrl: 'public/app/views/pages/vr/vr-image.html',
    controller: 'ImageCtrl'
  })

  .otherwise({
    redirectTo: '/'
  })


})
