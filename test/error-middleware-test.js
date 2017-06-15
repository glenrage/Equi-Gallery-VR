'use strict';

require('./lib/test-env.js');
// require('./')

const expect = require('chai').expect
const errorMiddleware = require('../server/lib/error-middleware.js');

function mockRes (){
  let res = {};
  res.status = function(num){
    this.statusCode = num;
    return this;
  };
  res.send = function(data){
    this.text = data.toString();
    return this;
  };
  res.json = function(data){
    this.body = data;
    return this;
  };
  return res;
}

describe('test errorMiddleware', function(){

});
