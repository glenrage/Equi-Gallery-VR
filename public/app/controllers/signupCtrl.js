'use strict';

const angular = require('angular');
angular.module('mainApp')
.component('signup', {
  template: require('../views/users/signup.html'),
  controllerAs: 'signupCtrl',
  controller: [
    '$location',
    '$window',
    'authService',
    SignupController,
  ],
});

function SignupController($location, $window, authService) {
  this.$onInit = () => {

    if(!$window.localStorage.token) {
      authService.getToken()
      .then(
      () => $location.url('/vrfeed'),
      () => $location.url('/signup')
      );
    }

    this.signup = function(user) {

      return authService.signup(user)
      .then(() => $location.url('/vrfeed'));
    };
  };
}
