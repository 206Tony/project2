// 'use strict';
require('dotenv').config();
const buildMarvelQuery = require('../middleware/buildMarvelQuery');
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/', function(req, res) { 
  res.render('character')
});