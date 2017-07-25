'use strict';

//npm modules
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const path = require('path');

const errorMiddleware = require('./server/lib/error-middleware.js');
const authRouter = require('./server/route/auth-router.js');
const galleryRouter = require('./server/route/gallery-router.js');
const photoRouter = require('./server/route/photo-router.js');
const userRouter = require('./server/route/user-router.js');

//load env vars
dotenv.load();

// module constants
const app = express();
const PORT = process.env.PORT;

//setup mongoose
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, function(err) {
  if (err) {
    console.log('Not connected to the database: ' + err);
  } else {
    console.log('Successfully connected to MongoDB');
  }
});

//app middleware
app.use(cors());
let production = process.env.NODE_ENV === 'production';
let morganFormat = production ? 'common' : 'dev';
app.use(morgan(morganFormat));
app.use(express.static(`${__dirname}/public/build`));

//app routes
app.use(errorMiddleware);
app.use(authRouter);
app.use(userRouter);
app.use(photoRouter);
app.use(galleryRouter);

// Start Server
const server = module.exports = app.listen(PORT, () => {
  console.log('Running the server on PORT ' + PORT);
});

server.isRunning = true;
