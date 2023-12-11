const express = require('express');
const apis = express.Router();



// MY MODULES
const product_module = require ("../../admin_app/lib/product")
const delivery_module = require("../../admin_app/lib/delivery_price")
const sub_category_module = require("../../admin_app/lib/sub_category")


apis.get("/products/:brand/:subcat",function (req,res) {


    const subcat = req.params.subcat
    const brand = req.params.brand


    product_module.product_get_all_sub_category_brand(subcat,brand,function (err,result1) {
        
        if (err) console.log(err)

        res.send({products : result1, err : err})


    })

    
})



apis.get("/delivery/price/:wilaya",function (req,res) {
  
    let wilaya = req.params.wilaya

    delivery_module.delivery_price_get_one_client(wilaya,function (err,result) {
        
        if (err) console.log('Error : ',err);
        res.send({delivery_price : result, err : err})

    })
    
})



apis.get("/subcat/list",function (req,res) {

    sub_category_module.sub_category_get_all(function (err,result1){

        if (err) console.log('Error : ',err);

        res.send({
    
            sub_category: result1,
            err : err
        
        });

    });

})

module.exports = apis;