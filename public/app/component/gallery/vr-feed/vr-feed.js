'use strict';

// require('./_vr-feed.scss');

module.exports = {
  template: require('./vr-feed.html'),
  controllerAs: 'vrFeedCtrl',
  controller: [
    '$log',
    '$scope',
    '$location',
    VrFeedController,
  ],
};

function VrFeedController($log, $scope, $location) {
  $log.debug('#vrFeedCtrl');

  this.upperIndex = [350, 330, 310, 290, 270, 250, 230, 210, 190, 170, 150, 130, 110, 90, 70, 50, 30, 10, 350, 330, 310, 290, 270, 250, 170, 150, 130, 110, 90, 70, 50, 30, 10];
  this.lowerIndex = [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3];

  this.images = [];

  this.getThumbnail = (url) => {
    if (url) {
      const index = url.lastIndexOf('/') + 1;
      const filename = url.substr(index);
      return 'flickr/thumbnails/flickr/' + filename;
    }
    return '';
  };

  this.viewImage = (imageURL) => {
    $location.url('#/image?url=' + imageURL);
  };

  const scene = document.querySelector('a-scene');
  if (scene) {
    if (scene.hasLoaded) {
      scene.enterVR();
    } else {
      scene.addEventListener('loaded', scene.enterVR);
    }
  }
}
