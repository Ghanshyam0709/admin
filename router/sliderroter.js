const express = require('express');

const router = express.Router();


const slider = require('../model/slidermodel');

const sliderroutes = require('../controller/slidercontroller');

router.get('/',sliderroutes.addslider);

router.post('/insertslider', slider.uploadavatar, sliderroutes.insertslider);

router.get('/view_slider',sliderroutes.view_slider);

// router.get('/delete/:id',sliderroutes.delete);

// router.get('/update/:id', sliderroutes.update);
// router.post('/editrecord', slider.uploadavatar, sliderroutes.editrecord);



router.post('/mulDel',sliderroutes.mulDel);


module.exports =router;