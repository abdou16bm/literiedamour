const express = require('express');
 const fs = require('fs');
 const status_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const status_controller = require('../controller/status');

 status_router.get('/status/list',authentication_controller.isAuthenticated,status_controller.status_list);
 status_router.get('/status/page/:page',authentication_controller.isAuthenticated,status_controller.status_list_page);
 status_router.get('/status/admin/list',authentication_controller.isAuthenticated,status_controller.status_list_admin);
 status_router.get('/status/admin/page/:page',authentication_controller.isAuthenticated,status_controller.status_list_page_admin);
 status_router.get('/status/:id/details',authentication_controller.isAuthenticated,status_controller.status_details);
 status_router.get('/status/:id/edit',authentication_controller.isAuthenticated,status_controller.status_edit);
 status_router.post('/status/:id/edit',authentication_controller.isAuthenticated,status_controller.status_edit_save);
 status_router.get('/status/add',authentication_controller.isAuthenticated,status_controller.status_add);
 status_router.post('/status/add',authentication_controller.isAuthenticated,status_controller.status_add_save);
 status_router.get('/status/:id/delete',authentication_controller.isAuthenticated,status_controller.status_delete);
 status_router.get('/status/list/:filter',authentication_controller.isAuthenticated,status_controller.status_filter);



 module.exports = status_router;


