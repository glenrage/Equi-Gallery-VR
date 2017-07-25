'use strict';

require('./_vr-feed.scss')

module.exports = {
  template: require('./vr-feed.html'),
  controllerAs: 'vrFeedCtrl',
  bindings: {
    user: '<',
    photo: '<',
  },
  controller: [
    '$log',
    '$document',
    'userService',
    VRFeedController,
  ],
};

function VRFeedController($log, $document, userService) {
  this.$onInit = () => {
    $log.debug('#VRFeedCtrl');

    this.photoClicked = false;

    // let scene = require('angular').element('<a-scene>');
    // $log.log(scene);
    // if (scene[0]) {
    //   if (scene.hasLoaded) {
    //     scene.enterVR();
    //   } else {
    //     scene.on('afterRender', scene.enterVR);
    //   }
    // }

    this.photoWasClicked = (pic) => {
      $log.debug('#vrFeedCtrl.photoWasClicked');
      $log.log(pic);
      this.clickedPic = pic;
      this.photoClicked = true;
    }

    this.fetchUserPhotos = () => {
      $log.debug('#vrFeedCtrl.fetchUserPhotos');

      userService.fetchPhotos()
      .then(user => {
        this.user = user;
        this.user.photos.forEach((ele, i) => {
          if (i === 0) ele.xValue = -0.8;
          if (i > 0) ele.xValue = this.user.photos[i - 1].xValue + 2.8;
        });
      })
      .catch(err => $log.error(err.message));
    };

    this.fetchUserPhotos();
  };
}
