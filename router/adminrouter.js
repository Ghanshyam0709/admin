const express = require('express');
const passport =require('passport');

const routes = express.Router();

const admin = require('../model/model');

const admincontroller = require('../controller/controller');


                

routes.get('/', admincontroller.login);

routes.post('/checkLogin',passport.authenticate('local', { failureRedirect: '/' }),admincontroller.checkLogin)



routes.get('/password', admincontroller.password);

routes.post('/modifypassword', admincontroller.modifypassword);

routes.get('/profile', admincontroller.profile);

routes.get('/readmore', admincontroller.readmore);

routes.get('/dashboard', passport.chaeckAuthenticatedUser,admincontroller.dashboard);

routes.get('/add_admin', passport.chaeckAuthenticatedUser, admincontroller.addadmin);

routes.post('/insertrecord',passport.chaeckAuthenticatedUser, admin.uploadavatar, admincontroller.insertrecord);

routes.get('/view_admin',passport.chaeckAuthenticatedUser, admincontroller.viewadmin);

routes.get('/delete/:id',passport.chaeckAuthenticatedUser, admincontroller.delete);

routes.get('/update/:id',passport.chaeckAuthenticatedUser, admincontroller.update);

routes.post('/editrecord',passport.chaeckAuthenticatedUser, admin.uploadavatar, admincontroller.editrecord);

routes.get('/Logout',passport.chaeckAuthenticatedUser, admincontroller.Logout);

routes.use('/user',passport.chaeckAuthenticatedUser, require('./userrotes'));

routes.use('/slider',passport.chaeckAuthenticatedUser, require('./sliderroter'));

routes.use('/offer',passport.chaeckAuthenticatedUser, require('./offerrouter'));

routes.use('/post',passport.chaeckAuthenticatedUser, require('./postrouter'));

routes.use('/review',passport.chaeckAuthenticatedUser, require('./reviewrouter'));

routes.use('/blog',passport.chaeckAuthenticatedUser, require('./blogrouter'));

routes.use('/comment',passport.chaeckAuthenticatedUser, require('./commentrouter'));

module.exports = routes;