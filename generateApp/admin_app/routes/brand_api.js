const express = require('express');
const fs = require('fs');
const brand_api = express.Router();


// my controller
const authentication_controller = require('../controller/authentication');
const dashboard_controller = require('../controller/dashboard');
const user_default_controller = require('../controller/user_default');


const brand_controller = require('../controller/brand');

brand_api.get('/brand/list',authentication_controller.isAuthenticated,brand_controller.brand_list);
brand_api.get('/brand/page/:page',authentication_controller.isAuthenticated,brand_controller.brand_list_page);
brand_api.get('/brand/admin/list',authentication_controller.isAuthenticated,brand_controller.brand_list_admin);
brand_api.get('/brand/admin/page/:page',authentication_controller.isAuthenticated,brand_controller.brand_list_page_admin);
brand_api.get('/brand/:id/details',authentication_controller.isAuthenticated,brand_controller.brand_details);
brand_api.get('/brand/:id/edit',authentication_controller.isAuthenticated,brand_controller.brand_edit);
brand_api.post('/brand/:id/edit',authentication_controller.isAuthenticated,brand_controller.brand_edit_save);
brand_api.get('/brand/add',authentication_controller.isAuthenticated,brand_controller.brand_add);
brand_api.post('/brand/add',authentication_controller.isAuthenticated,brand_controller.brand_add_save);
brand_api.get('/brand/:id/delete',authentication_controller.isAuthenticated,brand_controller.brand_delete);
brand_api.get('/brand/list/:filter',authentication_controller.isAuthenticated,brand_controller.brand_filter);



module.exports = brand_api;


