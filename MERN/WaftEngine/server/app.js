'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const device = require('express-device');
const requestIp = require('request-ip');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const hpp = require('hpp');
const httpStatus = require('http-status');
const mongoURI = process.env.MONGODB_URI;
const otherHelper = require('./helper/others.helper');
const { AddErrorToLogs } = require('./modules/bug/bugController');
const changephoto = require('./helper/photomanipulate').changephoto;
const { initSettings } = require('./helper/settings.helper');
const app = express();
// Logger middleware
app.use(logger('dev'));
app.use(device.capture());
// Body parser middleware
// create application/json parser
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);
// create application/x-www-form-urlencoded parser
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  }),
);
// protect against HTTP Parameter Pollution attacks
app.use(hpp());

app.use(
  cookieSession({
    name: 'session',
    keys: ['SECRECTKEY'],
    maxAge: 24 * 60 * 60 * 1000,
  }),
);
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());

// DB Config
mongoose.Promise = global.Promise;

Promise.resolve(app)
  .then(MongoDBConnection())
  .catch(err => console.error.bind(console, `MongoDB connection error: ${JSON.stringify(err)}`));

// Database Connection
async function MongoDBConnection() {
  console.log(`| MongoDB URL  : ${mongoURI}`);
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('| MongoDB Connected');
      console.log('|--------------------------------------------');
      SettingInitiate();
    });

  return null;
}

async function SettingInitiate() {
  await initSettings().then(() => {
    const auth = require('./helper/auth.helper');
    auth(passport);
    // Passport Config
    require('./helper/passport.helper')(passport);
  });
  return null;
}

// CORS setup for dev
app.use(function (req, res, next) {
  req.client_ip_address = requestIp.getClientIp(req);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
  next();
});


const routes = require('./routes/index');
// Use Routes
app.use('/api', routes);
app.use('/public/:w-:h/*', changephoto);
app.use('/public', express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, err, 'Route Not Found', null);
  } else {
    console.log('\x1b[41m', err);
    let path = req.baseUrl + req.route && req.route.path;
    if (path.substr(path.length - 1) === '/') {
      path = path.slice(0, path.length - 1);
    }
    err.method = req.method;
    err.path = req.path;
    AddErrorToLogs(req, res, next, err);
    return otherHelper.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, null, err, null, null);
  }
});

module.exports = app;
