'use strict';

module.exports = {
  template: require('./vr-image.html'),
  controllerAs: 'vrImageCtrl',
  controller: [
    '$log',
    '$location',
    '$routeParams',
    VrImageController,
  ],
};

function VrImageController($log, $location, $routeParams) {
  $log.debug('#vrImageCtrl');

  this.loading = true;
  const scene = document.querySelector('a-scene');

  if (scene) {
    if (scene.hasLoaded) {
      this.loading = false;
      scene.enterVR();
    } else {
      scene.addEventListener('loaded', scene.enterVR);
    }
  }

  // Ensure back functionality works as expected across devices
  this.$on('$routeChangeStart', function(scope, next) {
    if (next.$$route.controller == 'vrImageCtrl') {
      $location.url('/home');
    }
  });

  this.image = $routeParams.url;
}
