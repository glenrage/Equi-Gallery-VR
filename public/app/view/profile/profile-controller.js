'use strict';

// require('./_profile.scss');

module.exports = [
  '$log',
  '$location',
  'authService',
  ProfileController,
];

function ProfileController($log, $location, authService) {
  this.$onInit = () => {
    $log.debug('ProfileController()');

    this.showUpload = false;

  };
}
