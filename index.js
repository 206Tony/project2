require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const pages = require('express-paginate');
const axios = require('axios');
const md5 = require('md5');
const session = require('express-session');
const passport = require('./config/passportConfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const db = require('./models');
const methodOverride = require('method-override');
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
app.use(methodOverride('_method'));
 
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

// app.get('/main', isLoggedIn, function(req, res) {
//   res.render('main');
// });

app.get('/main', isLoggedIn, function(req, res) {
  var url = buildMarvelQuery('characters?');
  axios.get(url).then( function(apiResponse) {
    var characters = apiResponse.data.data.results;
    url = buildMarvelQuery('comics?');
    axios.get(url).then( function(apiResponse) {
      var comics = apiResponse.data.data.results;
      res.render('main', {characters, comics});  
    }).catch( err => res.json(err));
  });
});

app.all(pages, function(req, res, next) {
  // set default or minimum is 10 (as it was prior to v0.2.0)
  if (req.query.limit <= 10) req.query.limit = 10;
  next();
});

app.use('/auth', require('./routes/auth'));  // require part contains export of a router
app.use('/marvel', require('./routes/marvel'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;


// app.get('/main', (req, res) => {
//   const pageCount = Math.ceil(posts.length / 20);
//   let page = parseInt(req.query.character);
//   if (!page) { page = 1;}
//   if (page > pageCount) {
//     page = pageCount
//   }
//   res.json({
//     "page": page,
//     "pageCount": pageCount,
//     "character": posts.slice(page * 10 - 10, page * 10)
//   });
// });
  

// router.get('/', function(req, res, next) {
//   var result = req.models.products.count({
//   }, function(error, productsCount){
//       if(error) throw error;
//        totalRec      = productsCount;
//         pageCount     =  Math.ceil(totalRec /  pageSize);
  
//       if (typeof req.query.page !== 'undefined') {
//             currentPage = req.query.page;
//    }
    
//      if(currentPage >1){
     
//        start = (currentPage - 1) * pageSize;
//     }
    
//     var result = req.models.products.find({},{limit: pageSize, offset: start}, function(error, products){ 
//         if(error) throw error;
//         res.render('index', { data: products, pageSize: pageSize, pageCount: pageCount,currentPage: currentPage});
//     });
//   });
// });






















