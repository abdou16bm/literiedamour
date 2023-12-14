const express = require('express');
const apis = express.Router();



// MY MODULES
const product_module = require ("../../admin_app/lib/product")
const delivery_module = require("../../admin_app/lib/delivery_price")
const category_module = require("../../admin_app/lib/category")
const sub_category_module = require("../../admin_app/lib/sub_category")
const cart_module = require("../../admin_app/lib/cart")
const cart_p_module = require("../../admin_app/lib/cart_p")
const order_module = require("../../admin_app/lib/customer_order")

//MY CONTROLLER
const authentication_controller = require('../../admin_app/controller/authentication');
const cart_controller = require('../controller/cart');


apis.get("/cart",authentication_controller.isAuthenticated,cart_controller.cart_get_one_user)


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


apis.get("/cat/list",function (req,res) {

    category_module.category_get_all_top(5,function (err,result1){

        if (err) console.log('Error : ',err);

        res.send({
    
            category: result1,
            err : err
        
        });

    });

})



apis.get("/cart_p/add",authentication_controller.isAuthenticated,function (req,res) {

    let product_id = req.query.product
    let cart_id = req.session.cart_id

    console.log("productId : ",product_id)
    console.log("cartId : ",cart_id)

    product_module.product_get_one(product_id,function (err,result) {

        if (err) console.log(err)

        if (result.length > 0) {
            
            console.log("productPrice : ",result[0].product_price)

            let data_insert = {
                
                product_id : product_id, 
                cart_id : cart_id, 
                product_qt_c : 1, 
                product_price_c : result[0].product_price
            
            };

            cart_p_module.cart_p_add(data_insert,function (err,result1) {
                
                if (err) console.log('error',err);

                res.send({insert_result : result1, err : err, session : req.session});
            
            });

        }
         
    })
   
});



apis.get("/cart_p/:product/delete",authentication_controller.isAuthenticated,function (req,res) {

    let product_id = req.params.product
    let cart_id = req.session.cart_id

    cart_p_module.cart_p_delete(product_id,cart_id,function (err,result1) {

        if (err) console.log(err)
            
        res.send({result_delete : result1, err : err})
        
    })
    
})


apis.get("/cart_p/:product/edit",authentication_controller.isAuthenticated,function (req,res) {

    let product_id = req.params.product
    let cart_id = req.session.cart_id
    let qte = req.query.qte

    cart_p_module.cart_p_update2({product_qt_c : qte},product_id,cart_id,function (err,result1) {

        if (err) console.log(err)
            
        res.send({result_update : result1, err : err})
        
    })
    
})



apis.get("/cart/valid",authentication_controller.isAuthenticated,function (req,res) {

    let user_id = req.session.userid

    order_module.customer_order_generate(user_id,function (err,result1) {

        if (err) console.log(err)
            
        res.send({result : result1, err : err})
        
    })    

})



module.exports = apis;