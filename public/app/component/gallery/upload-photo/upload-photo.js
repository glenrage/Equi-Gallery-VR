'use strict';

// require('./_upload-pic.scss');

module.exports = {
  template: require('./upload-photo.html'),
  controllerAs: 'uploadPhotoCtrl',
  bindings: {
    user: '<',
  },
  controller: [
    '$log',
    'userService',
    UploadPhotoController,
  ],
};

function UploadPhotoController($log, userService) {
  this.$onInit = () => {
    $log.debug('Upload Photo Controller');
    this.photo = {};

    this.uploadPic = () => {
      userService.uploadPhoto(this.user, this.photo)
      .then(
        () => {
          this.photo.name = null;
          this.photo.desc = null;
          this.photo.file = null;
        },
        err => $log.error(err)
      );
    };
  };
}
