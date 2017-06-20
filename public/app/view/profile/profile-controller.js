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



    this.galleries = [];

    this.fetchGalleries = () => {
      return galleryService.fetchGalleries()
      .then(galleries => {
        this.galleries = galleries;
        this.currentGallery = this.galleries[0];
      })
      .catch(err => $log.error(err));
    };

    $rootScope.$on('locationChangeSuccess', this.fetchGalleries);
    this.fetchGalleries();
  };
}
