var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var app = express();
const body_parser = require("body-parser");

// parse JSON (application/json content-type)
app.use(body_parser.json());

const port = 9000;

// << db setup for courses >>
const db = require("./db");
const dbName = "course_data";
const collectionName = "comp";
var courseCollection;
// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  courseCollection = dbCollection;
  dbCollection.find().toArray(function(err, result) {
      if (err) throw err;
        console.log(result);
  });
}, function(err) { // failureCallback
  throw (err);
});
// crud routes

// get item by ID
// ex. $ curl http://localhost:9000/items/{itemName}
// ->JSON object matching the id
app.get("/courses/:id", (request, response) => {
  const itemId = request.params.id;
  var codeInt = parseInt(itemId);
  courseCollection.findOne({ code: codeInt }, (error, result) => {
     if (error) throw error;
     // return item
     response.json(result);
  });
});

// get contents of entire collection
// ex. $ curl http://localhost:9000/items
// ->JSON array of collection documents
app.get("/courses", (request, response) => {
  console.log("get item list");
  // return updated list
  courseCollection.find().toArray((error, result) => {
      if (error) throw error;
      response.json(result);
  });
});

// delete document from collection
// ex: curl -X DELETE http://localhost:9000/items/{itemName}
// -> returns JSON Array of updated collection documents
app.delete("/courses/:id", (request, response) => {
  const itemId = request.params.id;
  var codeInt = parseInt(itemId);
  console.log("Delete item with id: ", itemId);

  courseCollection.deleteOne({ code: codeint }, function(error, result) {
      if (error) throw error;
      // send back entire updated list after successful request
      courseCollection.find().toArray(function(_error, _result) {
          if (_error) throw _error;
          response.json(_result);
      });
  });
});

// << db setup for users>>
const dbName2 = "course_data";
const collectionName2 = "users";
var userCollection;
// << db init >>
db.initialize(dbName2, collectionName2, function(dbCollection) { // successCallback
  // get all items
  userCollection = dbCollection;
  dbCollection.find().toArray(function(err, result) {
      if (err) throw err;
        console.log(result);
  });
});
// add to dbCollection
// ex: $ curl -X POST -H "Content-Type: application/json" --data '{"id": "tt0109830", "name": "Forrest
// Gump", "genre": "drama"}' http://localhost:9000/items

app.post("/users", (request, response) => {
  const item = request.body;
  userCollection.insertOne(item, (error, result) => { // callback of insertOne
      if (error) throw error;
      // return updated list
      userCollection.find().toArray((_error, _result) => { // callback of find
          if (_error) throw _error;
          response.json(_result);
      });
  });
});

// update collection document
// ex: curl -X PUT -H "Content-Type: application/json" --data '{"qty": 200}' http://localhost:9000/items/canvas2
//  -> returns array of collection items to update front end 
app.put("/users/:id", (request, response) => {
  const itemId = request.params.id;
  const item = request.body;
  console.log("Editing item: ", itemId, " to be ", item);

  userCollection.updateOne({ username: itemId }, { $set: item }, (error, result) => {
      if (error) throw error;
      // send back entire updated list, to make sure frontend data is up-to-date
      userCollection.find().toArray(function(_error, _result) {
          if (_error) throw _error;
          response.json(_result);
      });
  });
});

// get contents of entire collection
// ex. $ curl http://localhost:9000/items
// ->JSON array of collection documents
app.get("/users", (request, response) => {
  console.log("get item list");
  // return updated list
  userCollection.find().toArray((error, result) => {
      if (error) throw error;
      response.json(result);
  });
});

// delete document from collection
// ex: curl -X DELETE http://localhost:9000/items/{itemName}
// -> returns JSON Array of updated collection documents
app.delete("/users/:id", (request, response) => {
  const itemId = request.params.id;
  console.log("Delete item with id: ", itemId);

  userCollection.deleteOne({ username: itemId }, function(error, result) {
      if (error) throw error;
      // send back entire updated list after successful request
      userCollection.find().toArray(function(_error, _result) {
          if (_error) throw _error;
          response.json(_result);
      });
  });
});

// get item by ID
// ex. $ curl http://localhost:9000/items/{itemName}
// ->JSON object matching the id
app.get("/users/:id", (request, response) => {
  const itemId = request.params.id;
 
  userCollection.findOne({ username: itemId }, (error, result) => {
     if (error) throw error;
     // return item
     response.json(result);
  });
});

// get contents of entire collection
// ex. $ curl http://localhost:9000/items
// ->JSON array of collection documents
app.get("/users", (request, response) => {
  console.log("get item list");
  // return updated list
  userCollection.find().toArray((error, result) => {
      if (error) throw error;
      response.json(result);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;