const express = require('express');
 const fs = require('fs');
 const user_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const user_controller = require('../controller/user');

 user_router.get('/user/list',authentication_controller.isAuthenticated,user_controller.user_list);
 user_router.get('/user/page/:page',authentication_controller.isAuthenticated,user_controller.user_list_page);
 user_router.get('/user/admin/list',authentication_controller.isAuthenticated,user_controller.user_list_admin);
 user_router.get('/user/admin/page/:page',authentication_controller.isAuthenticated,user_controller.user_list_page_admin);
 user_router.get('/user/:id/details',authentication_controller.isAuthenticated,user_controller.user_details);
 user_router.get('/user/:id/edit',authentication_controller.isAuthenticated,user_controller.user_edit);
 user_router.post('/user/:id/edit',authentication_controller.isAuthenticated,user_controller.user_edit_save);
 user_router.get('/user/add',authentication_controller.isAuthenticated,user_controller.user_add);
 user_router.post('/user/add',authentication_controller.isAuthenticated,user_controller.user_add_save);
 user_router.get('/user/:id/delete',authentication_controller.isAuthenticated,user_controller.user_delete);
 user_router.get('/user/list/:filter',authentication_controller.isAuthenticated,user_controller.user_filter);



 module.exports = user_router;


