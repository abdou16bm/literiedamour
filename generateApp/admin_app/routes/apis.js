
// Modules
var express = require('express');
var fs = require('fs');
var api = express.Router();



const router_api_controller = require('../controller/router_api');


const sub_category_module = require("../lib/sub_category")

// my controller
let authentication_module = require('../controller/authentication');



api.post('/content/upload/',authentication_module.isAuthenticated, router_api_controller.upload_content);
api.delete('/content/remove/',authentication_module.isAuthenticated, router_api_controller.remove_content);


api.get("/subcat/list",function (req,res) {

    let filterCat = ""

    sub_category_module.sub_category_get_all(filterCat,function (err,result1){

        if (err) console.log('Error : ',err);

        res.send({
    
            sub_category: result1,
            err : err
        
        });

    });

})


module.exports = api;