const debug = require('debug')('equi-gallery:user-mock');
// const User = require('../../model/user-model.js');


module.exports = function(done){
  debug('create mock user');
  let username = 'Test' + Math.floor(Math.random() * (100 - 1))
  let password = '12345678'
  let email = 'test'
  let exampleUser = {
    username,
    password,
    email: `${email}@test.vr`,
  };
  this.tempPassword = password;
  new User(exampleUser)
  .generatePasswordHash(exampleUser.password)
  .then( user => user.save())
  .then( user => {
    this.tempUser = user;
    return user.generateToken();
  })
  .then( token => {
    this.tempToken = token;
    done();
  })
  .catch(done);
};
