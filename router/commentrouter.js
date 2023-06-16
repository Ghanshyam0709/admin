const express = require('express');

const routes = express.Router();

const comment = require('../model/commentmodle');

const commentrcontroller = require('../controller/commentcontroller');

routes.get('/', commentrcontroller.addcomment);


routes.get('/view_comment',commentrcontroller.view_comment);

// routes.get('/view_comment', commentrcontroller.view_comment);

// routes.get('/isActive/:id',commentrcontroller.isActive);


module.exports = routes;