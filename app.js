var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var bot = require('./bot/index');
var usersRouter = require('./web/routes/users');
var adminRouter = require('./web/routes/admin');
var db = require('./bot/Database/configDB');
bot.run();
var app = express();

db.connect(err => {
  if (err) {
    console.log("Database connection error");
  } else {
    console.log("Connection to database successfull");
  }
})
// view engine setup
app.set('views', path.join(__dirname, 'web', 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: `${__dirname}/web/views/layouts/`,
  partialsDir: `${__dirname}/web/views/partials/`
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'web', 'public')));

app.use('/', usersRouter);
app.use('/admin', adminRouter);

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
