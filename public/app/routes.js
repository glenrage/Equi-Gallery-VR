'use strict';

require('angular');

const app = angular.module('appRoutes', ['ngRoute']);

.config(function($routeProvider, $locationProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'app/views/index.html'
  })

  .when('/register', {
    templateUrl: 'app/views/pages/users/register.html',
    controller: 'regCtrl',
    controllerAs: 'register',
  })

  .when('/login', {
    templateUrl: 'app/views/pages/users/login.html',
  })

  .when('/profile', {
    templateUrl: 'app/views/pages/users/profile.html',
  })

  .when('/vrfeed', {
    templateUrl: 'app/views/pages/vr/vr-feed.html',
    controller: 'MainMenuCtrl'
  })

  .when('/image', {
    templateUrl: 'app/views/pages/vr/vr-image.html',
    controller: 'ImageCtrl'
  })
  
  otherwise({
    redirectTo: '/'
  })


})
