'use strict';

require('./_upload-photo.scss');

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
    $log.debug('#uploadPhotoCtrl');
    this.photo = {};
    $log.log(this.user);

    this.uploadPhoto = () => {
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
