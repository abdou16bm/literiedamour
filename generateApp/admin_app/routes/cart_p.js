const express = require('express');
 const fs = require('fs');
 const cart_p_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const cart_p_controller = require('../controller/cart_p');

 cart_p_router.get('/cart_p/list',authentication_controller.isAuthenticated,cart_p_controller.cart_p_list);
 cart_p_router.get('/cart_p/page/:page',authentication_controller.isAuthenticated,cart_p_controller.cart_p_list_page);
 cart_p_router.get('/cart_p/admin/list',authentication_controller.isAuthenticated,cart_p_controller.cart_p_list_admin);
 cart_p_router.get('/cart_p/admin/page/:page',authentication_controller.isAuthenticated,cart_p_controller.cart_p_list_page_admin);
 cart_p_router.get('/cart_p/:id/details',authentication_controller.isAuthenticated,cart_p_controller.cart_p_details);
 cart_p_router.get('/cart_p/:id/edit',authentication_controller.isAuthenticated,cart_p_controller.cart_p_edit);
 cart_p_router.post('/cart_p/:id/edit',authentication_controller.isAuthenticated,cart_p_controller.cart_p_edit_save);
 cart_p_router.get('/cart_p/add',authentication_controller.isAuthenticated,cart_p_controller.cart_p_add);
 cart_p_router.post('/cart_p/add',authentication_controller.isAuthenticated,cart_p_controller.cart_p_add_save);
 cart_p_router.get('/cart_p/:id/delete',authentication_controller.isAuthenticated,cart_p_controller.cart_p_delete);
 cart_p_router.get('/cart_p/list/:filter',authentication_controller.isAuthenticated,cart_p_controller.cart_p_filter);



 module.exports = cart_p_router;


