const express = require('express');
 const fs = require('fs');
 const order_p_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const order_p_controller = require('../controller/order_p');

 order_p_router.get('/order_p/list',authentication_controller.isAuthenticated,order_p_controller.order_p_list);
 order_p_router.get('/order_p/page/:page',authentication_controller.isAuthenticated,order_p_controller.order_p_list_page);
 order_p_router.get('/order_p/admin/list',authentication_controller.isAuthenticated,order_p_controller.order_p_list_admin);
 order_p_router.get('/order_p/admin/page/:page',authentication_controller.isAuthenticated,order_p_controller.order_p_list_page_admin);
 order_p_router.get('/order_p/:id/details',authentication_controller.isAuthenticated,order_p_controller.order_p_details);
 order_p_router.get('/order_p/:id/edit',authentication_controller.isAuthenticated,order_p_controller.order_p_edit);
 order_p_router.post('/order_p/:id/edit',authentication_controller.isAuthenticated,order_p_controller.order_p_edit_save);
 order_p_router.get('/order_p/add',authentication_controller.isAuthenticated,order_p_controller.order_p_add);
 order_p_router.post('/order_p/add',authentication_controller.isAuthenticated,order_p_controller.order_p_add_save);
 order_p_router.get('/order_p/:id/delete',authentication_controller.isAuthenticated,order_p_controller.order_p_delete);
 order_p_router.get('/order_p/list/:filter',authentication_controller.isAuthenticated,order_p_controller.order_p_filter);



 module.exports = order_p_router;


