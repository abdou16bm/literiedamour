const express = require('express');
 const fs = require('fs');
 const abonnement_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const abonnement_controller = require('../controller/abonnement');

 abonnement_router.get('/abonnement/list',authentication_controller.isAuthenticated,abonnement_controller.abonnement_list);
 abonnement_router.get('/abonnement/page/:page',authentication_controller.isAuthenticated,abonnement_controller.abonnement_list_page);
 abonnement_router.get('/abonnement/admin/list',authentication_controller.isAuthenticated,abonnement_controller.abonnement_list_admin);
 abonnement_router.get('/abonnement/admin/page/:page',authentication_controller.isAuthenticated,abonnement_controller.abonnement_list_page_admin);
 abonnement_router.get('/abonnement/:id/details',authentication_controller.isAuthenticated,abonnement_controller.abonnement_details);
 abonnement_router.get('/abonnement/:id/edit',authentication_controller.isAuthenticated,abonnement_controller.abonnement_edit);
 abonnement_router.post('/abonnement/:id/edit',authentication_controller.isAuthenticated,abonnement_controller.abonnement_edit_save);
 abonnement_router.get('/abonnement/add',authentication_controller.isAuthenticated,abonnement_controller.abonnement_add);
 abonnement_router.post('/abonnement/add',authentication_controller.isAuthenticated,abonnement_controller.abonnement_add_save);
 abonnement_router.get('/abonnement/:id/delete',authentication_controller.isAuthenticated,abonnement_controller.abonnement_delete);
 abonnement_router.get('/abonnement/list/:filter',authentication_controller.isAuthenticated,abonnement_controller.abonnement_filter);



 module.exports = abonnement_router;


