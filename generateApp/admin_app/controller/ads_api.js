const express = require('express');
 const fs = require('fs');
 const ads_api = express.Router();


// my controller
 const authentication_controller = require('../controller/authentication');
 const dashboard_controller = require('../controller/dashboard');
 const user_default_controller = require('../controller/user_default');


const ads_controller = require('../controller/ads');

 ads_api.get('/ads/list',authentication_controller.isAuthenticated,ads_controller.ads_list);
 ads_api.get('/ads/page/:page',authentication_controller.isAuthenticated,ads_controller.ads_list_page);
 ads_api.get('/ads/admin/list',authentication_controller.isAuthenticated,ads_controller.ads_list_admin);
 ads_api.get('/ads/admin/page/:page',authentication_controller.isAuthenticated,ads_controller.ads_list_page_admin);
 ads_api.get('/ads/:id/details',authentication_controller.isAuthenticated,ads_controller.ads_details);
 ads_api.get('/ads/:id/edit',authentication_controller.isAuthenticated,ads_controller.ads_edit);
 ads_api.post('/ads/:id/edit',authentication_controller.isAuthenticated,ads_controller.ads_edit_save);
 ads_api.get('/ads/add',authentication_controller.isAuthenticated,ads_controller.ads_add);
 ads_api.post('/ads/add',authentication_controller.isAuthenticated,ads_controller.ads_add_save);
 ads_api.get('/ads/:id/delete',authentication_controller.isAuthenticated,ads_controller.ads_delete);
 ads_api.get('/ads/list/:filter',authentication_controller.isAuthenticated,ads_controller.ads_filter);



 module.exports = ads_api;


