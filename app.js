var express = require('express');
var routes = require('./routes');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/groups');

var app = express();

var connection = require('express-myconnection');
var mysql = require('mysql');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : 'Password@123',
        port : 3306, //port mysql
        database:'restapp'
    },'request')
);

app.use('/', index);

//users request mapping
app.get('/users', users.listUsers);
app.get('/users/:id', users.getID);
app.post('/users/', users.createUser);
app.delete('/users/:id', users.deleteUser);

//groups request mapping
app.get('/groups', groups.listGroups);
app.get('/groups/:id', groups.getID);
app.post('/groups', groups.createGroup);
app.post('/groups/:id/user/:userId', groups.addUserToGroup);
app.delete('/groups/:id', groups.deleteGroup);
app.delete('/groups/:id/user/:userId', groups.removeUserFromGroup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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