const express = require('express');
 const fs = require('fs');
 const user_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const user_controller = require('../controller/user');

 user_api.get('/user/list',authentication_controller.isAuthenticated,user_controller.user_list);
 user_api.get('/user/page/:page',authentication_controller.isAuthenticated,user_controller.user_list_page);
 user_api.get('/user/admin/list',authentication_controller.isAuthenticated,user_controller.user_list_admin);
 user_api.get('/user/admin/page/:page',authentication_controller.isAuthenticated,user_controller.user_list_page_admin);
 user_api.get('/user/:id/details',authentication_controller.isAuthenticated,user_controller.user_details);
 user_api.get('/user/:id/edit',authentication_controller.isAuthenticated,user_controller.user_edit);
 user_api.post('/user/:id/edit',authentication_controller.isAuthenticated,user_controller.user_edit_save);
 user_api.get('/user/add',authentication_controller.isAuthenticated,user_controller.user_add);
 user_api.post('/user/add',authentication_controller.isAuthenticated,user_controller.user_add_save);
 user_api.get('/user/:id/delete',authentication_controller.isAuthenticated,user_controller.user_delete);
 user_api.get('/user/list/:filter',authentication_controller.isAuthenticated,user_controller.user_filter);



 module.exports = user_api;


