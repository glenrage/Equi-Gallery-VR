'use strict';

module.exports = {
  template: require('./navbar.html'),
  controllerAs: 'navbarCtrl',
  controller: [
    '$log',
    '$location',
    '$rootScope',
    'authService',
    NavbarController,
  ],
};

function NavbarController($log, $location, $rootScope, authService) {
  this.$onInit = () => {
    $log.debug('NavbarController');

    this.checkPath = function() {
      let path = $location.path();
      if (path === '/join') {
        this.hideButtons = true;
      }
      if (path !== '/join') {
        this.hideButtons = false;
        authService.getToken()
        .catch(() => {
          $location.url('/join#signup');
        });
      }
    };

    this.logout = function() {
      $log.debug('navbarCtrl.logout()');
      this.hideButtons = true;
      authService.logout()
      .then(() => $location.url('/join#signup'));
    };

    $rootScope.$on('$locationChangeSuccess', () => {
      this.checkPath();
    });

    this.checkPath();
  };
}
