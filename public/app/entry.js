'use strict';

const path = require('path');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const angular = require('angular');
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-touch');
require('ng-file-upload');
require('@uirouter/angularjs');

const omniApp = angular.module('omniApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'ngFileUpload']);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach(path => omniApp.config(context(path)));

context = require.context('./view/', true, /\.js$/);
context.keys().forEach(key => omniApp.controller(pascalcase(path.basename(key, '.js')), context(key)));

context = require.context('./service/', true, /\.js$/);
context.keys().forEach(key => omniApp.service(camelcase(path.basename(key, '.js')), context(key)));

context = require.context('./component/', true, /\.js$/);
context.keys().forEach(key => omniApp.component(camelcase(path.basename(key, '.js')), context(key)));

context = require.context('./filter/', true, /\.js$/);
context.keys().forEach(key => omniApp.filter(camelcase(path.basename(key, '.js')), context(key)));
