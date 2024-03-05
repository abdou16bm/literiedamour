const express = require('express');
 const fs = require('fs');
 const customer_order_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


 const customer_order_controller = require('../controller/customer_order');

 customer_order_router.get('/orders/list',authentication_controller.isAuthenticated,customer_order_controller.customer_order_list);
 customer_order_router.get('/customer_order/page/:page',authentication_controller.isAuthenticated,customer_order_controller.customer_order_list_page);
 customer_order_router.get('/customer_order/admin/list',authentication_controller.isAuthenticated,customer_order_controller.customer_order_list_admin);
 customer_order_router.get('/customer_order/admin/page/:page',authentication_controller.isAuthenticated,customer_order_controller.customer_order_list_page_admin);
 customer_order_router.get('/order/:id/details',authentication_controller.isAuthenticated,customer_order_controller.customer_order_details);
 customer_order_router.get('/customer_order/:id/edit',authentication_controller.isAuthenticated,customer_order_controller.customer_order_edit);
 customer_order_router.post('/customer_order/:id/edit',authentication_controller.isAuthenticated,customer_order_controller.customer_order_edit_save);
 customer_order_router.get('/customer_order/add',authentication_controller.isAuthenticated,customer_order_controller.customer_order_add);
 customer_order_router.post('/customer_order/add',authentication_controller.isAuthenticated,customer_order_controller.customer_order_add_save);
 customer_order_router.get('/order/:id/delete',authentication_controller.isAuthenticated,customer_order_controller.customer_order_delete);
 customer_order_router.get('/customer_order/list/:filter',authentication_controller.isAuthenticated,customer_order_controller.customer_order_filter);


 customer_order_router.get('/order/:order/status/:status',authentication_controller.isAuthenticated,customer_order_controller.order_status_update);

 customer_order_router.get("/order/:id/print",authentication_controller.isAuthenticated,customer_order_controller.customer_order_print)


 module.exports = customer_order_router;


