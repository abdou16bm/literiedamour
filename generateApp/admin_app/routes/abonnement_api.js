const express = require('express');
 const fs = require('fs');
 const abonnement_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const abonnement_controller = require('../controller/abonnement');

 abonnement_api.get('/abonnement/list',authentication_controller.isAuthenticated,abonnement_controller.abonnement_list);
 abonnement_api.get('/abonnement/page/:page',authentication_controller.isAuthenticated,abonnement_controller.abonnement_list_page);
 abonnement_api.get('/abonnement/admin/list',authentication_controller.isAuthenticated,abonnement_controller.abonnement_list_admin);
 abonnement_api.get('/abonnement/admin/page/:page',authentication_controller.isAuthenticated,abonnement_controller.abonnement_list_page_admin);
 abonnement_api.get('/abonnement/:id/details',authentication_controller.isAuthenticated,abonnement_controller.abonnement_details);
 abonnement_api.get('/abonnement/:id/edit',authentication_controller.isAuthenticated,abonnement_controller.abonnement_edit);
 abonnement_api.post('/abonnement/:id/edit',authentication_controller.isAuthenticated,abonnement_controller.abonnement_edit_save);
 abonnement_api.get('/abonnement/add',authentication_controller.isAuthenticated,abonnement_controller.abonnement_add);
 abonnement_api.post('/abonnement/add',authentication_controller.isAuthenticated,abonnement_controller.abonnement_add_save);
 abonnement_api.get('/abonnement/:id/delete',authentication_controller.isAuthenticated,abonnement_controller.abonnement_delete);
 abonnement_api.get('/abonnement/list/:filter',authentication_controller.isAuthenticated,abonnement_controller.abonnement_filter);



 module.exports = abonnement_api;


