const express = require('express');
 const fs = require('fs');
 const product_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const product_controller = require('../controller/product');

 product_api.get('/product/list',authentication_controller.isAuthenticated,product_controller.product_list);
 product_api.get('/product/page/:page',authentication_controller.isAuthenticated,product_controller.product_list_page);
 product_api.get('/product/admin/list',authentication_controller.isAuthenticated,product_controller.product_list_admin);
 product_api.get('/product/admin/page/:page',authentication_controller.isAuthenticated,product_controller.product_list_page_admin);
 product_api.get('/product/:id/details',authentication_controller.isAuthenticated,product_controller.product_details);
 product_api.get('/product/:id/edit',authentication_controller.isAuthenticated,product_controller.product_edit);
 product_api.post('/product/:id/edit',authentication_controller.isAuthenticated,product_controller.product_edit_save);
 product_api.get('/product/add',authentication_controller.isAuthenticated,product_controller.product_add);
 product_api.post('/product/add',authentication_controller.isAuthenticated,product_controller.product_add_save);
 product_api.get('/product/:id/delete',authentication_controller.isAuthenticated,product_controller.product_delete);
 product_api.get('/product/list/:filter',authentication_controller.isAuthenticated,product_controller.product_filter);



 module.exports = product_api;


