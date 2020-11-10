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

// << db setup >>
const db = require("./db");
const dbName = "test";
const collectionName = "inventory";

// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  dbCollection.find().toArray(function(err, result) {
      if (err) throw err;
        console.log(result);
  });

  // << db CRUD routes >>
  // app.post("/items", (request, response) => {
  //   const item = request.body;
  //   dbCollection.insertOne(item, (error, result) => { // callback of insertOne
  //       if (error) throw error;
  //       // return updated list
  //       dbCollection.find().toArray((_error, _result) => { // callback of find
  //           if (_error) throw _error;
  //           response.json(_result);
  //       });
  //   });
  // });
  // app.get("/items/:id", (request, response) => {
  //   const itemId = request.params.id;

  //   dbCollection.findOne({ item: itemId }, (error, result) => {
  //      if (error) throw error;
  //      // return item
  //      response.json(result);
  //   });
  // });
  app.get("/items", (request, response) => {
    // console.log("get item list");
    // // return updated list
    // dbCollection.find().toArray((error, result) => {
    //     if (error) throw error;
    //     response.json(result);
    // });
    response.send('Hello World');
  });

}, function(err) { // failureCallback
  throw (err);
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
app.use('/items');
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
