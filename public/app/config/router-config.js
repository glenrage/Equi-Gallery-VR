'use strict';

module.exports = ['$stateProvider', '$urlServiceProvider', routerConfig];

function routerConfig($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.rules.when('', '/join');
  $urlServiceProvider.rules.when('/', '/join');
  $urlServiceProvider.rules.when('/signup', '/join#signup');
  $urlServiceProvider.rules.when('/login', '/join#login');

  let routes = [
    {
      name :'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
    },
    {
      name :'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl',
    },
    {
      name :'profile',
      url: '/profile',
      template: require('../view/profile/profile.html'),
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
    },
  ];

  routes.forEach($stateProvider.state);
}
