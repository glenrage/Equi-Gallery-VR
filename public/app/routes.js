'use strict';

const app = angular.module('appRoutes', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'public/app/views/home.html',
  })

  .when('/signup', {
    templateUrl: 'public/app/views/pages/users/signup.html',
    controller: 'signupController',
    controllerAs: 'signupCtrl',
  })

  .when('/login', {
    templateUrl: 'public/app/views/pages/users/login.html',
  })

  .when('/profile', {
    templateUrl: 'public/app/views/pages/users/profile.html',
  })

  .when('/vrfeed', {
    templateUrl: 'public/app/views/pages/vr/vr-feed.html',
    controller: 'MainMenuCtrl',
  })

  .when('/image', {
    templateUrl: 'public/app/views/pages/vr/vr-image.html',
    controller: 'ImageCtrl',
  })

  .otherwise({
    redirectTo: '/',
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
});
