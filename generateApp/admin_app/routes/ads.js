const express = require('express');
 const fs = require('fs');
 const ads_router = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const ads_controller = require('../controller/ads');

 ads_router.get('/ads/list',authentication_controller.isAuthenticated,ads_controller.ads_list);
 ads_router.get('/ads/page/:page',authentication_controller.isAuthenticated,ads_controller.ads_list_page);
 ads_router.get('/ads/admin/list',authentication_controller.isAuthenticated,ads_controller.ads_list_admin);
 ads_router.get('/ads/admin/page/:page',authentication_controller.isAuthenticated,ads_controller.ads_list_page_admin);
 ads_router.get('/ads/:id/details',authentication_controller.isAuthenticated,ads_controller.ads_details);
 ads_router.get('/ads/:id/edit',authentication_controller.isAuthenticated,ads_controller.ads_edit);
 ads_router.post('/ads/:id/edit',authentication_controller.isAuthenticated,ads_controller.ads_edit_save);
 ads_router.get('/ads/add',authentication_controller.isAuthenticated,ads_controller.ads_add);
 ads_router.post('/ads/add',authentication_controller.isAuthenticated,ads_controller.ads_add_save);
 ads_router.get('/ads/:id/delete',authentication_controller.isAuthenticated,ads_controller.ads_delete);
 ads_router.get('/ads/list/:filter',authentication_controller.isAuthenticated,ads_controller.ads_filter);



 module.exports = ads_router;


