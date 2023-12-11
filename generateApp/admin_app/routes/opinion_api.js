const express = require('express');
 const fs = require('fs');
 const opinion_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const opinion_controller = require('../controller/opinion');

 opinion_api.get('/opinion/list',authentication_controller.isAuthenticated,opinion_controller.opinion_list);
 opinion_api.get('/opinion/page/:page',authentication_controller.isAuthenticated,opinion_controller.opinion_list_page);
 opinion_api.get('/opinion/admin/list',authentication_controller.isAuthenticated,opinion_controller.opinion_list_admin);
 opinion_api.get('/opinion/admin/page/:page',authentication_controller.isAuthenticated,opinion_controller.opinion_list_page_admin);
 opinion_api.get('/opinion/:id/details',authentication_controller.isAuthenticated,opinion_controller.opinion_details);
 opinion_api.get('/opinion/:id/edit',authentication_controller.isAuthenticated,opinion_controller.opinion_edit);
 opinion_api.post('/opinion/:id/edit',authentication_controller.isAuthenticated,opinion_controller.opinion_edit_save);
 opinion_api.get('/opinion/add',authentication_controller.isAuthenticated,opinion_controller.opinion_add);
 opinion_api.post('/opinion/add',authentication_controller.isAuthenticated,opinion_controller.opinion_add_save);
 opinion_api.get('/opinion/:id/delete',authentication_controller.isAuthenticated,opinion_controller.opinion_delete);
 opinion_api.get('/opinion/list/:filter',authentication_controller.isAuthenticated,opinion_controller.opinion_filter);



 module.exports = opinion_api;


