const express = require('express');
 const fs = require('fs');
 const sub_category_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const sub_category_controller = require('../controller/sub_category');

 sub_category_api.get('/sub_category/list',authentication_controller.isAuthenticated,sub_category_controller.sub_category_list);
 sub_category_api.get('/sub_category/page/:page',authentication_controller.isAuthenticated,sub_category_controller.sub_category_list_page);
 sub_category_api.get('/sub_category/admin/list',authentication_controller.isAuthenticated,sub_category_controller.sub_category_list_admin);
 sub_category_api.get('/sub_category/admin/page/:page',authentication_controller.isAuthenticated,sub_category_controller.sub_category_list_page_admin);
 sub_category_api.get('/sub_category/:id/details',authentication_controller.isAuthenticated,sub_category_controller.sub_category_details);
 sub_category_api.get('/sub_category/:id/edit',authentication_controller.isAuthenticated,sub_category_controller.sub_category_edit);
 sub_category_api.post('/sub_category/:id/edit',authentication_controller.isAuthenticated,sub_category_controller.sub_category_edit_save);
 sub_category_api.get('/sub_category/add',authentication_controller.isAuthenticated,sub_category_controller.sub_category_add);
 sub_category_api.post('/sub_category/add',authentication_controller.isAuthenticated,sub_category_controller.sub_category_add_save);
 sub_category_api.get('/sub_category/:id/delete',authentication_controller.isAuthenticated,sub_category_controller.sub_category_delete);
 sub_category_api.get('/sub_category/list/:filter',authentication_controller.isAuthenticated,sub_category_controller.sub_category_filter);



 module.exports = sub_category_api;


