const express = require('express');
 const fs = require('fs');
 const product_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const product_controller = require('../controller/product');

 product_router.get('/products/list',authentication_controller.isAuthenticated,product_controller.product_list);
 product_router.get('/product/page/:page',authentication_controller.isAuthenticated,product_controller.product_list_page);
 product_router.get('/product/admin/list',authentication_controller.isAuthenticated,product_controller.product_list_admin);
 product_router.get('/product/admin/page/:page',authentication_controller.isAuthenticated,product_controller.product_list_page_admin);
 product_router.get('/product/:id/details',authentication_controller.isAuthenticated,product_controller.product_details);
 product_router.get('/product/:id/edit',authentication_controller.isAuthenticated,product_controller.product_edit);
 product_router.post('/product/:id/edit',authentication_controller.isAuthenticated,product_controller.product_edit_save);
 product_router.get('/product/add',authentication_controller.isAuthenticated,product_controller.product_add);
 product_router.post('/product/add',authentication_controller.isAuthenticated,product_controller.product_add_save);
 product_router.get('/product/:id/delete',authentication_controller.isAuthenticated,product_controller.product_delete);
 product_router.get('/product/list/:filter',authentication_controller.isAuthenticated,product_controller.product_filter);

 
 product_router.get('/product/:id/sheet',authentication_controller.isAuthenticated,product_controller.product_data_sheet);
 
 product_router.post('/quantity/:id/edit',authentication_controller.isAuthenticated,product_controller.product_qt_edit)



 module.exports = product_router;


