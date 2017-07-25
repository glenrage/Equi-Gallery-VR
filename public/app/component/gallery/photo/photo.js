'use strict';

require('./_photo.scss');

module.exports = {
  template: require('./photo.html'),
  controllerAs: 'photoCtrl',
  bindings: {
    photo: '<',
  },
  controller: [
    '$log',
    '$sce',
    '$sceDelegate',
    PhotoController,
  ],
};

function PhotoController($log, $sce, $sceDelegate) {
  this.$onInit = () => {
    $log.debug('#photoCtrl');

    let trustedURI = $sceDelegate.trustAs($sce.RESOURCE_URL, this.photo.imageURI);
    this.photo.trustedURI = $sceDelegate.getTrusted($sce.RESOURCE_URL, trustedURI);
    this.photo.ID = `#${this.photo.$$hashKey.split(':').join('')}`;
  };
}
