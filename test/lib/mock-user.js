const debug = require('debug')('equi-gallery:user-mock');

const User = require('../../server/model/user-model.js');


module.exports = function(done){
  debug('create mock user');

  let username = 'Test' + Math.floor(Math.random() * 1);
  let password = 'pass' + Math.floor(Math.random() * 1);
  let email = 'test' + Math.floor(Math.random() * 1);
  let exampleUser = {
    username,
    password,
    email: `${email}@test.com`,
    id: 12345,
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
