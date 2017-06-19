'use strict';

const mockUser = require('../server/model/user-model.js');

require('angular')
.module('mainApp')
.component('userInfo', {
  template: require('../views/pages/users/profile/profile.html'),
  controllerAs: 'userCtrl',
  controller: ['$log', '$window', '$location', 'authService', userController ]});


  function userController('$log', '$window', '$location', 'authService'){
    this.$onInit = () => {
      $log.debug('userController');

      this.title = 'Welcome to your profile'
      this.

    }
  }
