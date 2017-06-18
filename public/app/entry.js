'use strict';

angular.module('mainApp', ['appRoutes','ng', 'ngResource'])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptors');
});
