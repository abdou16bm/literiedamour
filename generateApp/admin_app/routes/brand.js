const express = require('express');
 const fs = require('fs');
 const brand_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const brand_controller = require('../controller/brand');

  brand_router.get('/brands/list',authentication_controller.isAuthenticated,brand_controller.brand_list);
 brand_router.get('/brand/page/:page',authentication_controller.isAuthenticated,brand_controller.brand_list_page);
 brand_router.get('/brand/admin/list',authentication_controller.isAuthenticated,brand_controller.brand_list_admin);
 brand_router.get('/brand/admin/page/:page',authentication_controller.isAuthenticated,brand_controller.brand_list_page_admin);
 brand_router.get('/brand/:id/details',authentication_controller.isAuthenticated,brand_controller.brand_details);
 brand_router.get('/brand/:id/edit',authentication_controller.isAuthenticated,brand_controller.brand_edit);
 brand_router.post('/brand/:id/edit',authentication_controller.isAuthenticated,brand_controller.brand_edit_save);
 brand_router.get('/brand/add',authentication_controller.isAuthenticated,brand_controller.brand_add);
 brand_router.post('/brand/add',authentication_controller.isAuthenticated,brand_controller.brand_add_save);
 brand_router.get('/brand/:id/delete',authentication_controller.isAuthenticated,brand_controller.brand_delete);
 brand_router.get('/brand/list/:filter',authentication_controller.isAuthenticated,brand_controller.brand_filter);



 module.exports = brand_router;


