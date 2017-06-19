'use strict';

//require('./_upload-pic.scss');

module.exports = {
  template: require('./upload-pic.html'),
  controllerAs: 'uploadPicCtrl',
  bindings:{
    user: '<',
  },
  controller: [
    '$log',
    'picService',
    UploadPicController,
  ],
};

function UploadPicController($log, picService){
  this.$onInit = () => {
    $log.debug('UploadPicController');
    this.photo = {};

    this.uploadPic = () => {
      picService.uploadPic(this.gallery, this.pic)
      .then(
        () => {
          this.photo.desc = null;
          this.photo.file = null;
        },
        err => $log.error(err)
      );
    };
  };
}
