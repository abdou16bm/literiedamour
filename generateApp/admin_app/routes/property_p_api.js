const express = require('express');
 const fs = require('fs');
 const property_p_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const property_p_controller = require('../controller/property_p');

 property_p_api.get('/property_p/list',authentication_controller.isAuthenticated,property_p_controller.property_p_list);
 property_p_api.get('/property_p/page/:page',authentication_controller.isAuthenticated,property_p_controller.property_p_list_page);
 property_p_api.get('/property_p/admin/list',authentication_controller.isAuthenticated,property_p_controller.property_p_list_admin);
 property_p_api.get('/property_p/admin/page/:page',authentication_controller.isAuthenticated,property_p_controller.property_p_list_page_admin);
 property_p_api.get('/property_p/:id/details',authentication_controller.isAuthenticated,property_p_controller.property_p_details);
 property_p_api.get('/property_p/:id/edit',authentication_controller.isAuthenticated,property_p_controller.property_p_edit);
 property_p_api.post('/property_p/:id/edit',authentication_controller.isAuthenticated,property_p_controller.property_p_edit_save);
 property_p_api.get('/property_p/add',authentication_controller.isAuthenticated,property_p_controller.property_p_add);
 property_p_api.post('/property_p/add',authentication_controller.isAuthenticated,property_p_controller.property_p_add_save);
 property_p_api.get('/property_p/:id/delete',authentication_controller.isAuthenticated,property_p_controller.property_p_delete);
 property_p_api.get('/property_p/list/:filter',authentication_controller.isAuthenticated,property_p_controller.property_p_filter);



 module.exports = property_p_api;


