const express = require('express');
 const fs = require('fs');
 const privilege_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const privilege_controller = require('../controller/privilege');

 privilege_api.get('/privilege/list',authentication_controller.isAuthenticated,privilege_controller.privilege_list);
 privilege_api.get('/privilege/page/:page',authentication_controller.isAuthenticated,privilege_controller.privilege_list_page);
 privilege_api.get('/privilege/admin/list',authentication_controller.isAuthenticated,privilege_controller.privilege_list_admin);
 privilege_api.get('/privilege/admin/page/:page',authentication_controller.isAuthenticated,privilege_controller.privilege_list_page_admin);
 privilege_api.get('/privilege/:id/details',authentication_controller.isAuthenticated,privilege_controller.privilege_details);
 privilege_api.get('/privilege/:id/edit',authentication_controller.isAuthenticated,privilege_controller.privilege_edit);
 privilege_api.post('/privilege/:id/edit',authentication_controller.isAuthenticated,privilege_controller.privilege_edit_save);
 privilege_api.get('/privilege/add',authentication_controller.isAuthenticated,privilege_controller.privilege_add);
 privilege_api.post('/privilege/add',authentication_controller.isAuthenticated,privilege_controller.privilege_add_save);
 privilege_api.get('/privilege/:id/delete',authentication_controller.isAuthenticated,privilege_controller.privilege_delete);
 privilege_api.get('/privilege/list/:filter',authentication_controller.isAuthenticated,privilege_controller.privilege_filter);



 module.exports = privilege_api;


