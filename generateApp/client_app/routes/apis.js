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
const product_sub_cat_module = require("../../admin_app/lib/product_sub_cat")

//MY CONTROLLER
const authentication_controller = require('../../admin_app/controller/authentication');
const cart_controller = require('../controller/cart');
const order_controller = require("../controller/customer_order")


apis.get("/cart",authentication_controller.isAuthenticated,cart_controller.cart_get_one_user)
apis.get('/checkout/:product',order_controller.checkout);


apis.get("/products/:brand/:subcat",function (req,res) {


    const subcat = req.params.subcat
    const brand = req.params.brand


    product_module.product_get_all_sub_category_brand(subcat,brand,function (err,result1) {

        if (err) console.log(err)

        res.send({products : result1, err : err})


    })


})



apis.get("/delivery_price/:wilaya/:type",function (req,res) {

    let wilaya = req.params.wilaya
    let type = req.params.type

    delivery_module.delivery_price_get_one_client(wilaya,type,function (err,result) {

        if (err) console.log('Error : ',err);
        res.send({delivery_price : result, err : err})

    })

})



apis.get("/subcat/list",function (req,res) {

    let filterCat = ""

    sub_category_module.sub_category_get_all(filterCat,function (err,result1){

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
    let product_price = req.query.price
    let subcat = req.query.sub
    let cart_id = req.session.cart_id
    let subcat_name = ""

    console.log("productId : ",product_id)
    console.log("cartId : ",cart_id)
    console.log("product_price : ",product_price)


    product_module.product_get_one(product_id,function (err,result) {

        if (err) console.log(err)

        if (result.length > 0) {

            let data_insert = {

                product_id : product_id,
                cart_id : cart_id,
                product_qt_c : 1,
                // product_price_c : result[0].product_price
                // product_price_c : product_price,
                // product_info1_c : subcat_name
            };

            if (subcat > 0) {
                product_sub_cat_module.product_sub_cat_get_one(product_id, subcat, function (err, result4) {
                    if (err) console.log('error', err);
                    console.log(result4)
                    // product_price = result4[0].product_sub_cat_price
                    subcat_name = result4[0].sub_cat_name
                    data_insert.product_price_c = result4[0].product_sub_cat_price
                    data_insert.product_info1_c = result4[0].sub_cat_name

                    cart_p_module.cart_p_add(data_insert,function (err,result1) {

                        if (err) console.log('error',err);

                        res.send({insert_result : result1, err : err, session : req.session});

                    });
                })
            }
            else {
                // product_price = result[0].product_price
                data_insert.product_price_c = result[0].product_price

                cart_p_module.cart_p_add(data_insert,function (err,result1) {

                    if (err) console.log('error',err);

                    res.send({insert_result : result1, err : err, session : req.session});

                });
            }





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



apis.get("/cart/:type/valid",authentication_controller.isAuthenticated,function (req,res) {

    let user_id = req.session.userid
    let delivery_type = req.params.type
    let multi = false
    if (req.session.privid == 5) multi = true

    order_module.customer_order_generate(user_id,delivery_type,function (err,result1) {

        if (err) console.log(err)

        res.send({result : result1, multi : multi, err : err})

    })

})



module.exports = apis;
