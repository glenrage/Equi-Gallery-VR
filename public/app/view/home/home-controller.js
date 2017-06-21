'use strict';

// require('./_home.scss');

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  HomeController,
];

function HomeController($log, $rootScope, $window, $location, authService) {
  this.$onInit = () => {
    $log.debug('HomeController()');

    if (!$window.localStorage.token) {
      authService.getToken()
      .then(
        () => $location.url('/home'),
        () => $location.url('/signup')
      );
    }
  };
}
