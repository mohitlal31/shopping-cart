let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let expressHbs = require('express-handlebars');
let mongoose = require('mongoose');
let session = require('express-session');


let indexRouter = require('./routes/index');

let app = express();

let mongoUri = 'mongodb+srv://mohitlal:Ms0ST9vavfhZ2mJ1@cluster0-p3frq.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true });

// view engine setup
app.engine('.hbs', expressHbs({ extname: '.hbs', defaultLayout: 'layout' }));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
