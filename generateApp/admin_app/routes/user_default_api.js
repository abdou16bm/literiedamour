const express = require('express');
 const fs = require('fs');
 const user_default_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


//Router user & login ////////////////////////////////////////////////////
user_default_api.get('/', user_default_controller.user_login);

user_default_api.post('/', user_default_controller.user_login_check);
user_default_api.get('/logout', user_default_controller.user_logout);
user_default_api.get('/home',authentication_controller.isAuthenticated, dashboard_controller.home);



 module.exports = user_default_api;


