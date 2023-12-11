const express = require('express');
 const fs = require('fs');
 const wilaya_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const wilaya_controller = require('../controller/wilaya');

 wilaya_router.get('/wilaya/list',authentication_controller.isAuthenticated,wilaya_controller.wilaya_list);
 wilaya_router.get('/wilaya/page/:page',authentication_controller.isAuthenticated,wilaya_controller.wilaya_list_page);
 wilaya_router.get('/wilaya/admin/list',authentication_controller.isAuthenticated,wilaya_controller.wilaya_list_admin);
 wilaya_router.get('/wilaya/admin/page/:page',authentication_controller.isAuthenticated,wilaya_controller.wilaya_list_page_admin);
 wilaya_router.get('/wilaya/:id/details',authentication_controller.isAuthenticated,wilaya_controller.wilaya_details);
 wilaya_router.get('/wilaya/:id/edit',authentication_controller.isAuthenticated,wilaya_controller.wilaya_edit);
 wilaya_router.post('/wilaya/:id/edit',authentication_controller.isAuthenticated,wilaya_controller.wilaya_edit_save);
 wilaya_router.get('/wilaya/add',authentication_controller.isAuthenticated,wilaya_controller.wilaya_add);
 wilaya_router.post('/wilaya/add',authentication_controller.isAuthenticated,wilaya_controller.wilaya_add_save);
 wilaya_router.get('/wilaya/:id/delete',authentication_controller.isAuthenticated,wilaya_controller.wilaya_delete);
 wilaya_router.get('/wilaya/list/:filter',authentication_controller.isAuthenticated,wilaya_controller.wilaya_filter);



 module.exports = wilaya_router;


