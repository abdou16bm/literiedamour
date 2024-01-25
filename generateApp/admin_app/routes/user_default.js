const express = require('express');
 const fs = require('fs');
 const user_default_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


//Router user & login ////////////////////////////////////////////////////
user_default_router.get('/', user_default_controller.user_login);

user_default_router.post('/', user_default_controller.user_login_check);
user_default_router.get('/logout', user_default_controller.user_logout);
user_default_router.get('/home',authentication_controller.isAuthenticated,dashboard_controller.home);

user_default_router.get('/profil',authentication_controller.isAuthenticated,user_default_controller.user_profil_edit);
user_default_router.post('/profil',authentication_controller.isAuthenticated,user_default_controller.user_profil_edit_save);


user_default_router.get('/stats/product',authentication_controller.isAuthenticated,user_default_controller.stats_product)
user_default_router.get('/stats/month',authentication_controller.isAuthenticated,user_default_controller.stats_month)
user_default_router.get('/stock',authentication_controller.isAuthenticated,user_default_controller.stock)
user_default_router.get('/home/page/edit',authentication_controller.isAuthenticated,user_default_controller.home_page_edit)

user_default_router.post('/banner/edit',authentication_controller.isAuthenticated,user_default_controller.banner_edit_save)
user_default_router.post('/video/edit',authentication_controller.isAuthenticated,user_default_controller.video_edit_save)




module.exports = user_default_router;


