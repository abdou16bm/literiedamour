 const express = require('express');
 const fs = require('fs');
 const details_router = express.Router();


 // my controller
 const authentication_controller = require('../controller/authentication');


 const details_controller = require('../controller/details');

 details_router.get('/details/list',authentication_controller.isAuthenticated,details_controller.details_list);
 details_router.get('/details/page/:page',authentication_controller.isAuthenticated,details_controller.details_list_page);
 details_router.get('/details/admin/list',authentication_controller.isAuthenticated,details_controller.details_list_admin);
 details_router.get('/details/admin/page/:page',authentication_controller.isAuthenticated,details_controller.details_list_page_admin);
 details_router.get('/details/:id/detailss',authentication_controller.isAuthenticated,details_controller.details_details);
 details_router.get('/details/:id/edit',authentication_controller.isAuthenticated,details_controller.details_edit);
 details_router.post('/details/:id/edit',authentication_controller.isAuthenticated,details_controller.details_edit_save);
 details_router.get('/details/add',authentication_controller.isAuthenticated,details_controller.details_add);
 details_router.post('/details/add',authentication_controller.isAuthenticated,details_controller.details_add_save);
 details_router.get('/details/:id/delete',authentication_controller.isAuthenticated,details_controller.details_delete);
 details_router.get('/details/list/:filter',authentication_controller.isAuthenticated,details_controller.details_filter);



 module.exports = details_router;


