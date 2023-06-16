const express = require('express');

const router = express.Router();

const slider = require('../model/slidermodel');

const userroutes = require('../controller/usercontroller');

router.get('/',userroutes.user);

module.exports =router;