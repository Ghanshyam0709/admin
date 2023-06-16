const express = require('express');

const routes = express.Router();

const offer = require('../model/offermodel');

const offerrcontroller = require('../controller/offercontroller');

routes.get('/', offerrcontroller.addoffer);

routes.post('/insertoffer',offerrcontroller.insertoffer);

routes.get('/view_offer', offerrcontroller.view_offer);

routes.get('/isActive/:id',offerrcontroller.isActive);


module.exports = routes;