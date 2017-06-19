'use strict';

require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controllerAs: 'loginCtrl',
  controller: [
    '$log',
    '$location',
    '$window',
    'authService',
    LoginController],
};

function LoginController($log, $location, $window, authService) {
  $log.debug('LoginController');

  if ($window.localStorage.token) {
    return authService.getToken()
    .then(() => $location.url('/home'));
  }

  this.login = function() {
    $log.log('loginCtrl.login()');

    return authService.login(this.user)
    .then(() => $location.url('/home'));
  };
}
