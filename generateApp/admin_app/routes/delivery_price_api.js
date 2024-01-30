const express = require('express');
 const fs = require('fs');
 const delivery_price_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const delivery_price_controller = require('../controller/delivery_price');

 delivery_price_api.get('/delivery/price/list',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_list);
 delivery_price_api.get('/delivery/price/page/:page',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_list_page);
 delivery_price_api.get('/delivery/price/admin/list',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_list_admin);
 delivery_price_api.get('/delivery/price/admin/page/:page',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_list_page_admin);
 delivery_price_api.get('/delivery/price/:id/details',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_details);
 delivery_price_api.get('/delivery/price/:id/edit',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_edit);
 delivery_price_api.post('/delivery/price/:id/edit',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_edit_save);
 delivery_price_api.get('/delivery/price/add',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_add);
 delivery_price_api.post('/delivery/price/add',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_add_save);
 delivery_price_api.get('/delivery/price/:id/delete',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_delete);
 delivery_price_api.get('/delivery/price/list/:filter',authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_filter);


 delivery_price_api.post("/delivery_price/edit",authentication_controller.isAuthenticated,delivery_price_controller.delivery_price_update)


 module.exports = delivery_price_api;


