'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controllerAs: 'signupCtrl',
  controller: [
    '$log',
    '$location',
    '$window',
    'authService',
    SignupController,
  ],
};

function SignupController($log, $location, $window, authService) {
  this.$onInit = () => {
    $log.debug('SignupController');
    this.title = 'Complete this form to signup!';

    if (!$window.localStorage.token) {
      authService.getToken()
      .then(
        () => $location.url('/home'),
        () => $location.url('/signup')
      );
    }

    this.signup = function(user) {
      $log.debug('signupCtrl.signup()');

      return authService.signup(user)
      .then(() => $location.url('/home'));
    };
  };
}
