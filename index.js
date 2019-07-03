require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
//Calls API
const axios = require('axios');
const async = require('async');
//Hash generator
const md5 = require('md5');
//Module allows use of sessions
const session = require('express-session');
//import passport local strategy
const passport = require('./config/passportConfig');
//modules for flash messages
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
//this is only used by session store
const db = require('./models');
const buildMarvelQuery = require('./middleware/buildMarvelQuery');

const app = express();

//This line makes the session use sequelize to write session data to postgres table
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
  db: db.sequelize, 
  expiration: 1000 * 60 * 30
});


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());
 
//Configures the express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// use this line once to setup the store table
sessionStore.sync();

// Starts the flash middleware
app.use(flash());

// Link passport to express-session
// must be below session
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

// app.get('/profile', isLoggedIn, function(req, res) {
//   res.render('profile');
// });

app.get('/profile', isLoggedIn, function(req, res) {
  var url = buildMarvelQuery('characters');
  axios.get(url).then( function(apiResponse) {
    var characters = apiResponse.data.data.results;
    url = buildMarvelQuery('comics');
    axios.get(url).then( function(apiResponse) {
      var comics = apiResponse.data.data.results;
      res.render('profile', {characters, comics});  
    }).catch( err => res.json(err));
  });
});
  
app.use('/auth', require('./controllers/auth'));  // require part contains export of a router
app.use('/marvel', require('./controllers/marvel'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

  
  
























