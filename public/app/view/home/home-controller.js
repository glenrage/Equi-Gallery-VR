'use strict';

// require('./_home.scss');

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  // 'galleryService',
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
    //
    // this.galleries = [];
    //
    // this.fetchGalleries = () => {
    //   return galleryService.fetchGalleries()
    //   .then(galleries => {
    //     this.galleries = galleries;
    //     this.currentGallery = this.galleries[0];
    //   })
    //   .catch(err => $log.error(err));
    // };

    // $rootScope.$on('locationChangeSuccess', this.fetchGalleries);
    // this.fetchGalleries();
  };
}
