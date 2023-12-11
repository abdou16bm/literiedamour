
// Modules
var express = require('express');
var fs = require('fs');
var api = express.Router();



const router_api_controller = require('../controller/router_api');


// my controller
let authentication_module = require('../controller/authentication');



api.post('/content/upload/',authentication_module.isAuthenticated, router_api_controller.upload_content);
api.delete('/content/remove/',authentication_module.isAuthenticated, router_api_controller.remove_content);



module.exports = api;