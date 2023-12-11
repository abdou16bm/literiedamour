const express = require('express');
 const fs = require('fs');
 const category_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const category_controller = require('../controller/category');

 category_router.get('/category/list',authentication_controller.isAuthenticated,category_controller.category_list);
 category_router.get('/category/page/:page',authentication_controller.isAuthenticated,category_controller.category_list_page);
 category_router.get('/category/admin/list',authentication_controller.isAuthenticated,category_controller.category_list_admin);
 category_router.get('/category/admin/page/:page',authentication_controller.isAuthenticated,category_controller.category_list_page_admin);
 category_router.get('/category/:id/details',authentication_controller.isAuthenticated,category_controller.category_details);
 category_router.get('/category/:id/edit',authentication_controller.isAuthenticated,category_controller.category_edit);
 category_router.post('/category/:id/edit',authentication_controller.isAuthenticated,category_controller.category_edit_save);
 category_router.get('/category/add',authentication_controller.isAuthenticated,category_controller.category_add);
 category_router.post('/category/add',authentication_controller.isAuthenticated,category_controller.category_add_save);
 category_router.get('/category/:id/delete',authentication_controller.isAuthenticated,category_controller.category_delete);
 category_router.get('/category/list/:filter',authentication_controller.isAuthenticated,category_controller.category_filter);



 module.exports = category_router;


