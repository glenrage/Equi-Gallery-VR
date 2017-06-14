'use strict';

module.exports = exports = {}; // initialize our empty controller

 // toggle server 'ON' if server.isRunning=false
exports.serverUp = function(server, done) {
  if (!server.isRunning) {
    server.listen(process.env.PORT, () => {
      server.isRunning = true;
      done();
    });
    return;
  }
  done();
};

 // toggle server 'OFF' if server.isRunning=true
exports.serverDown = function(server, done) {
  if (server.isRunning) {
    server.close(err => {
      if (err) return done(err);
      server.isRunning = false;
      done();
    });
    return;
  }
  done();
};
