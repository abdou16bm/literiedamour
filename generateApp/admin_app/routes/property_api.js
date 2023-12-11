const express = require('express');
 const fs = require('fs');
 const property_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const property_controller = require('../controller/property');

 property_api.get('/property/list',authentication_controller.isAuthenticated,property_controller.property_list);
 property_api.get('/property/page/:page',authentication_controller.isAuthenticated,property_controller.property_list_page);
 property_api.get('/property/admin/list',authentication_controller.isAuthenticated,property_controller.property_list_admin);
 property_api.get('/property/admin/page/:page',authentication_controller.isAuthenticated,property_controller.property_list_page_admin);
 property_api.get('/property/:id/details',authentication_controller.isAuthenticated,property_controller.property_details);
 property_api.get('/property/:id/edit',authentication_controller.isAuthenticated,property_controller.property_edit);
 property_api.post('/property/:id/edit',authentication_controller.isAuthenticated,property_controller.property_edit_save);
 property_api.get('/property/add',authentication_controller.isAuthenticated,property_controller.property_add);
 property_api.post('/property/add',authentication_controller.isAuthenticated,property_controller.property_add_save);
 property_api.get('/property/:id/delete',authentication_controller.isAuthenticated,property_controller.property_delete);
 property_api.get('/property/list/:filter',authentication_controller.isAuthenticated,property_controller.property_filter);



 module.exports = property_api;


