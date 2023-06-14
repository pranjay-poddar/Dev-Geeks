# connect-mongodb-session

[MongoDB](http://mongodb.com)-backed session storage for [connect](https://www.npmjs.org/package/connect) and [Express](http://www.expressjs.com). Meant to be a well-maintained and fully-featured replacement for modules like [connect-mongo](https://www.npmjs.org/package/connect-mongo)

[![Build Status](https://travis-ci.org/mongodb-js/connect-mongodb-session.svg?branch=master)](https://travis-ci.org/mongodb-js/connect-mongodb-session) [![Coverage Status](https://coveralls.io/repos/mongodb-js/connect-mongodb-session/badge.svg?branch=master)](https://coveralls.io/r/mongodb-js/connect-mongodb-session?branch=master)



# MongoDBStore


This module exports a single function which takes an instance of connect
(or Express) and returns a `MongoDBStore` class that can be used to
store sessions in MongoDB.


## It can store sessions for Express 4


If you pass in an instance of the
[`express-session` module](http://npmjs.org/package/express-session)
the MongoDBStore class will enable you to store your Express sessions
in MongoDB.

The MongoDBStore class has 3 required options:

1. `uri`: a [MongoDB connection string](http://docs.mongodb.org/manual/reference/connection-string/)
2. `databaseName`: the MongoDB database to store sessions in
3. `collection`: the MongoDB collection to store sessions in

**Note:** You can pass a callback to the `MongoDBStore` constructor,
but this is entirely optional. The Express 3.x example demonstrates
that you can use the MongoDBStore class in a synchronous-like style: the
module will manage the internal connection state for you.


```javascript
var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var app = express();
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

app.get('/', function(req, res) {
  res.send('Hello ' + JSON.stringify(req.session));
});

server = app.listen(3000);
```

## It throws an error when it can't connect to MongoDB


You should pass a callback to the `MongoDBStore` constructor to catch
errors. If you don't pass a callback to the `MongoDBStore` constructor,
`MongoDBStore` will `throw` if it can't connect.


```javascript
var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var app = express();
var store = new MongoDBStore(
  {
    uri: 'mongodb://bad.host:27000/connect_mongodb_session_test?connectTimeoutMS=10',
    databaseName: 'connect_mongodb_session_test',
    collection: 'mySessions'
  },
  function(error) {
    // Should have gotten an error
  });

store.on('error', function(error) {
  // Also get an error here
});

app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

app.get('/', function(req, res) {
  res.send('Hello ' + JSON.stringify(req.session));
});

server = app.listen(3000);
```

## It supports several other options


There are several other options you can pass to `new MongoDBStore()`:


```javascript
var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions',

  // By default, sessions expire after 2 weeks. The `expires` option lets
  // you overwrite that by setting the expiration in milliseconds
  expires: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds

  // Lets you set options passed to `MongoClient.connect()`. Useful for
  // configuring connectivity or working around deprecation warnings.
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  }
});
```

## Azure Cosmos MongoDB support


It can support MongoDB instances inside Azure Cosmos. As Cosmos can only support
time-based index on fields called `_ts`, you will need to update your configuration.
Unlike in MongoDB, Cosmos starts the timer at the point of document creation so the
`expiresAfterSeconds` should have the same value as `expires` - as `expires` is in
milliseconds, the `expiresAfterSeconds` must equal `expires / 1000`.


```javascript

var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
  uri: 'mongodb://username:password@cosmosdb-name.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdb-name@', 
  databaseName: 'myDb',
  collection: 'mySessions',

  // Change the expires key name
  expiresKey: `_ts`,
  // This controls the life of the document - set to same value as expires / 1000
  expiresAfterSeconds: 60 * 60 * 24 * 14 
});
```
