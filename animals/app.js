var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
//var keys = require('./ keys')


var mongoose = require('mongoose');
var debug = require('debug')('animal:database');

var indexRouter = require('./routes/index');
var animalsRouter = require('./routes/animals');
//app.use('/users', usersRouter);

// Conect to database

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
  })
  .then(() => {
    debug("success Connected to database")
  })
  .catch((err) => {
    debug(err);
    process.exit(1);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/animals', animalsRouter);

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

/*
module.exports = {
  MONGO_URI: 'mongodb+srv://Margarita:Margaret@cluster0-k9b6k.mongodb.net/test?retryWrites=true&w=majority'
}
*/