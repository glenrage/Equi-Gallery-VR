const debug = require('debug')('equi-gallery:user-mock');
<<<<<<< HEAD
// const User = require('../../model/user-model.js');
=======
const User = require('../../server/model/user-model.js');
>>>>>>> 91b20b20585d5c794bda84f68868dbaab7911573


module.exports = function(done){
  debug('create mock user');
<<<<<<< HEAD
  let username = 'Test' + Math.floor(Math.random() * (100 - 1))
  let password = '12345678'
  let email = 'test'
  let exampleUser = {
    username,
    password,
    email: `${email}@test.vr`,
=======
  let username = 'Test' + Math.floor(Math.random() * 1);
  let password = 'pass' + Math.floor(Math.random() * 1);
  let email = 'test' + Math.floor(Math.random() * 1);
  let exampleUser = {
    username,
    password,
    email: `${email}@test.com`,
>>>>>>> 91b20b20585d5c794bda84f68868dbaab7911573
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
