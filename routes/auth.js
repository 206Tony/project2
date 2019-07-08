const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/passportConfig')

//sends signup form
router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

// GET /auth/signup recieves data from form above
router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      // Flash
      //console.log('User created!')
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account Created and Logged In!'
      })(req, res);
    } else {
      // Flash
      //console.log('Email already exists!');
      req.flash('error', 'Email Already Exists!');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    // Flash
    //console.log('An error occured: ' + error.message);
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

// Flash
router.post('/login', passport.authenticate('local', {
  successRedirect: '/main/show',
  failureRedirect: '/auth/login',
  successFlash: 'You have logged in!',
  failureFlash: 'Invalid username and/or password!'
})); 

router.get('/logout', function(req, res) {
  req.logout();
  // Flash
  //console.log('logged out');
  req.flash('success', 'You have logged out?');
  res.redirect('/');
});

module.exports = router;
