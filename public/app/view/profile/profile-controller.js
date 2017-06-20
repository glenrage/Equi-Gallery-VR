'use strict';

// require('./_profile.scss');

module.exports = [
  '$log',
  '$window',
  '$location',
  ProfileController,
];

function ProfileController($log, $window, $location) {
  this.$onInit = () => {

  };
}
