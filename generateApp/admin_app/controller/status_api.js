const express = require('express');
 const fs = require('fs');
 const status_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const status_controller = require('../controller/status');

 status_api.get('/status/list',authentication_controller.isAuthenticated,status_controller.status_list);
 status_api.get('/status/page/:page',authentication_controller.isAuthenticated,status_controller.status_list_page);
 status_api.get('/status/admin/list',authentication_controller.isAuthenticated,status_controller.status_list_admin);
 status_api.get('/status/admin/page/:page',authentication_controller.isAuthenticated,status_controller.status_list_page_admin);
 status_api.get('/status/:id/details',authentication_controller.isAuthenticated,status_controller.status_details);
 status_api.get('/status/:id/edit',authentication_controller.isAuthenticated,status_controller.status_edit);
 status_api.post('/status/:id/edit',authentication_controller.isAuthenticated,status_controller.status_edit_save);
 status_api.get('/status/add',authentication_controller.isAuthenticated,status_controller.status_add);
 status_api.post('/status/add',authentication_controller.isAuthenticated,status_controller.status_add_save);
 status_api.get('/status/:id/delete',authentication_controller.isAuthenticated,status_controller.status_delete);
 status_api.get('/status/list/:filter',authentication_controller.isAuthenticated,status_controller.status_filter);



 module.exports = status_api;


