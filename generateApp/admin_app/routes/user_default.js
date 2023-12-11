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



module.exports = user_default_router;


