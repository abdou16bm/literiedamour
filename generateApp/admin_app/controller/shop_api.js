const express = require('express');
 const fs = require('fs');
 const shop_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const shop_controller = require('../controller/shop');

 shop_api.get('/shop/list',authentication_controller.isAuthenticated,shop_controller.shop_list);
 shop_api.get('/shop/page/:page',authentication_controller.isAuthenticated,shop_controller.shop_list_page);
 shop_api.get('/shop/admin/list',authentication_controller.isAuthenticated,shop_controller.shop_list_admin);
 shop_api.get('/shop/admin/page/:page',authentication_controller.isAuthenticated,shop_controller.shop_list_page_admin);
 shop_api.get('/shop/:id/details',authentication_controller.isAuthenticated,shop_controller.shop_details);
 shop_api.get('/shop/:id/edit',authentication_controller.isAuthenticated,shop_controller.shop_edit);
 shop_api.post('/shop/:id/edit',authentication_controller.isAuthenticated,shop_controller.shop_edit_save);
 shop_api.get('/shop/add',authentication_controller.isAuthenticated,shop_controller.shop_add);
 shop_api.post('/shop/add',authentication_controller.isAuthenticated,shop_controller.shop_add_save);
 shop_api.get('/shop/:id/delete',authentication_controller.isAuthenticated,shop_controller.shop_delete);
 shop_api.get('/shop/list/:filter',authentication_controller.isAuthenticated,shop_controller.shop_filter);



 module.exports = shop_api;


