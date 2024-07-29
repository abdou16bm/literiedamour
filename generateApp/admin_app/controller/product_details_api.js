const express = require('express');
const fs = require('fs');
const product_details_api = express.Router();


// my controller
const authentication_controller = require('../controller/authentication');


const product_details_controller = require('../controller/product_details');

product_details_api.get('/product/details/list',authentication_controller.isAuthenticated,product_details_controller.product_details_list);
product_details_api.get('/product/details/page/:page',authentication_controller.isAuthenticated,product_details_controller.product_details_list_page);
product_details_api.get('/product/details/admin/list',authentication_controller.isAuthenticated,product_details_controller.product_details_list_admin);
product_details_api.get('/product/details/admin/page/:page',authentication_controller.isAuthenticated,product_details_controller.product_details_list_page_admin);
product_details_api.get('/product/details/:id/edit',authentication_controller.isAuthenticated,product_details_controller.product_details_edit);
product_details_api.post('/product/details/:id/edit',authentication_controller.isAuthenticated,product_details_controller.product_details_edit_save);
product_details_api.get('/product/details/add',authentication_controller.isAuthenticated,product_details_controller.product_details_add);
product_details_api.post('/product/details/add',authentication_controller.isAuthenticated,product_details_controller.product_details_add_save);
product_details_api.get('/product/details/:id/delete',authentication_controller.isAuthenticated,product_details_controller.product_details_delete);
product_details_api.get('/product/details/list/:filter',authentication_controller.isAuthenticated,product_details_controller.product_details_filter);



module.exports = product_details_api;


