const express = require('express');
 const fs = require('fs');
 const order_stat_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const order_stat_controller = require('../controller/order_stat');

 order_stat_router.get('/order_stat/list',authentication_controller.isAuthenticated,order_stat_controller.order_stat_list);
 order_stat_router.get('/order_stat/page/:page',authentication_controller.isAuthenticated,order_stat_controller.order_stat_list_page);
 order_stat_router.get('/order_stat/admin/list',authentication_controller.isAuthenticated,order_stat_controller.order_stat_list_admin);
 order_stat_router.get('/order_stat/admin/page/:page',authentication_controller.isAuthenticated,order_stat_controller.order_stat_list_page_admin);
 order_stat_router.get('/order_stat/:id/details',authentication_controller.isAuthenticated,order_stat_controller.order_stat_details);
 order_stat_router.get('/order_stat/:id/edit',authentication_controller.isAuthenticated,order_stat_controller.order_stat_edit);
 order_stat_router.post('/order_stat/:id/edit',authentication_controller.isAuthenticated,order_stat_controller.order_stat_edit_save);
 order_stat_router.get('/order_stat/add',authentication_controller.isAuthenticated,order_stat_controller.order_stat_add);
 order_stat_router.post('/order_stat/add',authentication_controller.isAuthenticated,order_stat_controller.order_stat_add_save);
 order_stat_router.get('/order_stat/:id/delete',authentication_controller.isAuthenticated,order_stat_controller.order_stat_delete);
 order_stat_router.get('/order_stat/list/:filter',authentication_controller.isAuthenticated,order_stat_controller.order_stat_filter);



 module.exports = order_stat_router;


