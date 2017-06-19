'use strict';

require(./_login.scss);

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$window', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl',
};

function LoginController($log, $window, $location, authService) {
  this.$onInit = () => {
    $log.debug('LoginController');

    this.login = function() {
      $log.log('loginCtrl.login');

      authService.login(this.user)
      .then(() => $location.url('/home'));
    };
  };
}
