const express = require('express');
 const fs = require('fs');
 const cart_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const cart_controller = require('../controller/cart');

 cart_api.get('/cart/list',authentication_controller.isAuthenticated,cart_controller.cart_list);
 cart_api.get('/cart/page/:page',authentication_controller.isAuthenticated,cart_controller.cart_list_page);
 cart_api.get('/cart/admin/list',authentication_controller.isAuthenticated,cart_controller.cart_list_admin);
 cart_api.get('/cart/admin/page/:page',authentication_controller.isAuthenticated,cart_controller.cart_list_page_admin);
 cart_api.get('/cart/:id/details',authentication_controller.isAuthenticated,cart_controller.cart_details);
 cart_api.get('/cart/:id/edit',authentication_controller.isAuthenticated,cart_controller.cart_edit);
 cart_api.post('/cart/:id/edit',authentication_controller.isAuthenticated,cart_controller.cart_edit_save);
 cart_api.get('/cart/add',authentication_controller.isAuthenticated,cart_controller.cart_add);
 cart_api.post('/cart/add',authentication_controller.isAuthenticated,cart_controller.cart_add_save);
 cart_api.get('/cart/:id/delete',authentication_controller.isAuthenticated,cart_controller.cart_delete);
 cart_api.get('/cart/list/:filter',authentication_controller.isAuthenticated,cart_controller.cart_filter);



 module.exports = cart_api;


