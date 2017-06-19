'use strict';

angular.module('signupController', ['authServices'])

  .controller('signupController', function(authServices) {

    signupController.$inject = ['authServices'];


    authServices.getToken()

    this.signup = function(user) {
      authServices.signup(user)
    }

  });
