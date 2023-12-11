const express = require('express');
 const fs = require('fs');
 const property_type_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const property_type_controller = require('../controller/property_type');

 property_type_api.get('/property_type/list',authentication_controller.isAuthenticated,property_type_controller.property_type_list);
 property_type_api.get('/property_type/page/:page',authentication_controller.isAuthenticated,property_type_controller.property_type_list_page);
 property_type_api.get('/property_type/admin/list',authentication_controller.isAuthenticated,property_type_controller.property_type_list_admin);
 property_type_api.get('/property_type/admin/page/:page',authentication_controller.isAuthenticated,property_type_controller.property_type_list_page_admin);
 property_type_api.get('/property_type/:id/details',authentication_controller.isAuthenticated,property_type_controller.property_type_details);
 property_type_api.get('/property_type/:id/edit',authentication_controller.isAuthenticated,property_type_controller.property_type_edit);
 property_type_api.post('/property_type/:id/edit',authentication_controller.isAuthenticated,property_type_controller.property_type_edit_save);
 property_type_api.get('/property_type/add',authentication_controller.isAuthenticated,property_type_controller.property_type_add);
 property_type_api.post('/property_type/add',authentication_controller.isAuthenticated,property_type_controller.property_type_add_save);
 property_type_api.get('/property_type/:id/delete',authentication_controller.isAuthenticated,property_type_controller.property_type_delete);
 property_type_api.get('/property_type/list/:filter',authentication_controller.isAuthenticated,property_type_controller.property_type_filter);



 module.exports = property_type_api;


