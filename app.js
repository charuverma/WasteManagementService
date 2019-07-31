var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var product = require('./routes/product');
var category = require('./routes/category');
var role = require('./routes/role');
var user = require('./routes/user');
var register = require('./routes/register');
var login = require('./routes/login');
var country = require('./routes/country');
var state = require('./routes/state');
var city = require('./routes/city');
var company = require('./routes/company');
var collector = require('./routes/collector');

var app = express();
var cors = require('cors');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public', (req, res) => res.status(404).end());

app.use('/product', product);
app.use('/category', category);
app.use('/role', role);
app.use('/user', user);
app.use('/register', register);
app.use('/login', login);
app.use('/country', country);
app.use('/state', state);
app.use('/city', city);
app.use('/company',company);
app.use('/collector',collector);


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.locals.site = {
	pageLimit: 2
};

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
