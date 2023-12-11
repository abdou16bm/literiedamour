const express = require('express');
 const fs = require('fs');
 const shop_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const shop_controller = require('../controller/shop');

 shop_router.get('/shop/list',authentication_controller.isAuthenticated,shop_controller.shop_list);
 shop_router.get('/shop/page/:page',authentication_controller.isAuthenticated,shop_controller.shop_list_page);
 shop_router.get('/shop/admin/list',authentication_controller.isAuthenticated,shop_controller.shop_list_admin);
 shop_router.get('/shop/admin/page/:page',authentication_controller.isAuthenticated,shop_controller.shop_list_page_admin);
 shop_router.get('/shop/:id/details',authentication_controller.isAuthenticated,shop_controller.shop_details);
 shop_router.get('/shop/:id/edit',authentication_controller.isAuthenticated,shop_controller.shop_edit);
 shop_router.post('/shop/:id/edit',authentication_controller.isAuthenticated,shop_controller.shop_edit_save);
 shop_router.get('/shop/add',authentication_controller.isAuthenticated,shop_controller.shop_add);
 shop_router.post('/shop/add',authentication_controller.isAuthenticated,shop_controller.shop_add_save);
 shop_router.get('/shop/:id/delete',authentication_controller.isAuthenticated,shop_controller.shop_delete);
 shop_router.get('/shop/list/:filter',authentication_controller.isAuthenticated,shop_controller.shop_filter);



 module.exports = shop_router;


