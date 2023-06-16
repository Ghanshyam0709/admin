const express = require('express');

const router = express.Router();

const blog = require('../model/blogmodel');
const comment = require('../model/commentmodle');



const blogroutes = require('../controller/blogcontroller');

router.get('/',blogroutes.addblog);

router.post('/insertblog', blog.uploadavatar, blogroutes.insertblog);

router.get('/view_blog',blogroutes.view_blog);

router.get('/isActive/:id',blogroutes.isActive);

router.get('/read_more',blogroutes.read_more);


router.post('/insertcomment',comment.uploadavatar,blogroutes.insertcomment);


module.exports =router;