const express = require('express');

const router = express.Router();

const post = require('../model/postmodel')

const postroutes = require('../controller/postcontroller');

router.get('/',postroutes.post);

router.post('/insertpost', post.uploadavatar , postroutes.insertpost);


router.get('/view_post',postroutes.view_post);

router.get('/isActive/:id',postroutes.isActive);

module.exports =router;