const express = require('express');

const routes = express.Router();

const review = require('../model/reviewmodel');

const reviewrcontroller = require('../controller/reviewcontroller');

routes.get('/', reviewrcontroller.addreview);

routes.post('/insertreview',reviewrcontroller.insertreview);

routes.get('/view_review', reviewrcontroller.view_review);

routes.get('/isActive/:id',reviewrcontroller.isActive);

module.exports = routes;