const express = require('express');
 const fs = require('fs');
 const privilege_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const privilege_controller = require('../controller/privilege');

 privilege_router.get('/privilege/list',authentication_controller.isAuthenticated,privilege_controller.privilege_list);
 privilege_router.get('/privilege/page/:page',authentication_controller.isAuthenticated,privilege_controller.privilege_list_page);
 privilege_router.get('/privilege/admin/list',authentication_controller.isAuthenticated,privilege_controller.privilege_list_admin);
 privilege_router.get('/privilege/admin/page/:page',authentication_controller.isAuthenticated,privilege_controller.privilege_list_page_admin);
 privilege_router.get('/privilege/:id/details',authentication_controller.isAuthenticated,privilege_controller.privilege_details);
 privilege_router.get('/privilege/:id/edit',authentication_controller.isAuthenticated,privilege_controller.privilege_edit);
 privilege_router.post('/privilege/:id/edit',authentication_controller.isAuthenticated,privilege_controller.privilege_edit_save);
 privilege_router.get('/privilege/add',authentication_controller.isAuthenticated,privilege_controller.privilege_add);
 privilege_router.post('/privilege/add',authentication_controller.isAuthenticated,privilege_controller.privilege_add_save);
 privilege_router.get('/privilege/:id/delete',authentication_controller.isAuthenticated,privilege_controller.privilege_delete);
 privilege_router.get('/privilege/list/:filter',authentication_controller.isAuthenticated,privilege_controller.privilege_filter);



 module.exports = privilege_router;


