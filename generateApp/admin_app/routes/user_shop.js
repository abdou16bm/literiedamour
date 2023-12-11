const express = require('express');
 const fs = require('fs');
 const user_shop_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const user_shop_controller = require('../controller/user_shop');

 user_shop_router.get('/user_shop/list',authentication_controller.isAuthenticated,user_shop_controller.user_shop_list);
 user_shop_router.get('/user_shop/page/:page',authentication_controller.isAuthenticated,user_shop_controller.user_shop_list_page);
 user_shop_router.get('/user_shop/admin/list',authentication_controller.isAuthenticated,user_shop_controller.user_shop_list_admin);
 user_shop_router.get('/user_shop/admin/page/:page',authentication_controller.isAuthenticated,user_shop_controller.user_shop_list_page_admin);
 user_shop_router.get('/user_shop/:id/details',authentication_controller.isAuthenticated,user_shop_controller.user_shop_details);
 user_shop_router.get('/user_shop/:id/edit',authentication_controller.isAuthenticated,user_shop_controller.user_shop_edit);
 user_shop_router.post('/user_shop/:id/edit',authentication_controller.isAuthenticated,user_shop_controller.user_shop_edit_save);
 user_shop_router.get('/user_shop/add',authentication_controller.isAuthenticated,user_shop_controller.user_shop_add);
 user_shop_router.post('/user_shop/add',authentication_controller.isAuthenticated,user_shop_controller.user_shop_add_save);
 user_shop_router.get('/user_shop/:id/delete',authentication_controller.isAuthenticated,user_shop_controller.user_shop_delete);
 user_shop_router.get('/user_shop/list/:filter',authentication_controller.isAuthenticated,user_shop_controller.user_shop_filter);



 module.exports = user_shop_router;


