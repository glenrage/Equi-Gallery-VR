// 'use strict';
//
// const path = require('path');
// const camelcase = require('camelcase');
// const pascalcase = require('pascalcase');
// const angular = require('angular');
// require('@uirouter/angularjs');
//
// const eqApp = angular.module('eqApp', ['ui.router']);
//
// let context = require.context('./config/', true, /\.js$/);
// context.keys().forEach(key => eqApp.config(context(key)));
//
// context = require.context('./view/', true, /\.js$/);
// context.keys().forEach(key => {
//   let name = pascalcase(path.basename(key, '.js'));
//   eqApp.controller(name, context(key));
// });
// //
// // context = require.context('./service/', true, /\.js$/);
// // context.keys().forEach(key => {
// //   let name = camelcase(path.basename(key, '.js'));
// //   let module = context(key);
// //   eqApp.service(name, module);
// // });
// //
// // context = require.context('./component/', true, /\.js$/);
// // context.keys().forEach(key => {
// //   let name = camelcase(path.basename(key, '.js'));
// //   let module = context(key);
// //   eqApp.component(name, module);
// // });
