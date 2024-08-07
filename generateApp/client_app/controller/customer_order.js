// MY MODULES

const product_module = require ("../../admin_app/lib/product")
const wilaya_module = require ("../../admin_app/lib/wilaya")
const user_module = require ("../../admin_app/lib/user")
const order_module = require ("../../admin_app/lib/customer_order")
const order_p_module = require ("../../admin_app/lib/order_p")
const order_stat_module = require ("../../admin_app/lib/order_stat")
const session_module = require("../../admin_app/lib/session")
const cart_module = require("../../admin_app/lib/cart")
const cart_p_module = require("../../admin_app/lib/cart_p")
const product_sub_cat_module = require("../../admin_app/lib/product_sub_cat")



const order_list = function (req,res) {

    const user_id = req.session.userid

    order_module.customer_order_get_all_user(user_id,function (err,result1) {

        if (err) console.log(err)

        res.render('orders',{orders : result1, session : req.session, err : req.query.err});

    })

}


const order_details = function (req,res) {

    const id = req.params.id;

    order_module.customer_order_get_one(id,function (err,result1) {

        if (err) console.log('error',err);

        order_p_module.order_p_get_all_order(id,function (err,result2) {

            if (err) console.log('error',err);

            if(req.baseUrl == "/api") {
                res.send({order : result1, order_p : result2, err : err, session : req.session});
            } else {
                res.render('order_details',{order : result1, order_p : result2, err : err, session : req.session});
            }

        })

    });

};




const checkout = function (req, res) {

    const product = req.params.product
    const subcat = req.query.sub
    let product_price = 0

    console.log("sub cat: ",subcat)


    if(req.session.privid != 5) {

        user_module.user_get_one(req.session.userid,function (err,result3){
            if (err) console.log(err)

            product_module.product_get_one_client(product,function (err,result1) {

                if (err) console.log(err)

                wilaya_module.wilaya_get_all(function (err,result2) {

                    if (subcat > 0) {

                        product_sub_cat_module.product_sub_cat_get_one(product,subcat,function (err,result4) {
                            if (err) console.log('error',err);

                            result1[0].product_price = result4[0].product_sub_cat_price
                            result1[0].product_sub_cat_name = result4[0].sub_cat_name

                            if(req.baseUrl == "/api") {
                                res.send({multi : false, err : err, session : req.session});
                            } else {
                                res.render('checkout',{product : result1, wilaya : result2, user: result3 , session : req.session, err : req.query.err});
                            }
                        })
                    }
                    else {

                        if(req.baseUrl == "/api") {
                            res.send({multi : false, err : err, session : req.session});
                        } else {
                            res.render('checkout',{product : result1, wilaya : result2, user: result3 , session : req.session, err : req.query.err});
                        }
                    }

                })
            })
        })

    }
    else {

        const cart_id = req.session.cart_id

        if (subcat > 0) {
            product_sub_cat_module.product_sub_cat_get_one(product, subcat, function (err, result4) {
                if (err) console.log('error', err);
                product_price = result4[0].product_sub_cat_price
            })
        }

        console.log("productId : ",product)
        console.log("cartId : ",cart_id)

        product_module.product_get_one(product,function (err,result) {

            if (err) console.log(err)

            if (result.length > 0) {

                console.log("productPrice : ",result[0].product_price)

                product_price > 0 ? false : product_price = result[0].product_price

                let data_insert = {

                    product_id : product,
                    cart_id : cart_id,
                    product_qt_c : 1,
                    product_price_c : product_price

                };

                cart_p_module.cart_p_add(data_insert,function (err,result1) {

                    if (err) console.log('error',err);


                    if(req.baseUrl == "/api") {
                        res.send({multi : true, err : err, session : req.session});
                    } else {
                        res.redirect('/cart');
                    }

                });

            }

        })
    }
}


const checkout_valid = function (req, res) {

    const product = req.params.product
    const subcat = req.query.sub
    let product_price = 0
    const input = req.body

    console.log("checkoutValid")
    console.log("input others : ", input)
    console.log("subcat : ", subcat)


    if (

        typeof (input.lastname) != "undefined" && input.lastname != null && input.lastname != ""
        && typeof (input.name) != "undefined" && input.name != null && input.name != ""
        && typeof (input.phone) != "undefined" && input.phone != null && input.phone != ""
        // && typeof (input.address) != "undefined" && input.address != null && input.address != ""
        && typeof (input.wilaya) != "undefined" && input.wilaya != null && input.wilaya != ""
        && typeof (input.delivery_type) != "undefined" && input.delivery_type != null && input.delivery_type != ""

    ) {


        let data_user_client = {

            user_id : req.session.userid,
            user_name: input.name.trim(),
            user_lastname: input.lastname.trim(),
            // user_address: input.address.trim(),
            user_phone: input.phone.trim(),
            //order_info : input.order_info.trim()
            wilaya_id: input.wilaya,
            user_status: 1

        };

        if (!req.session.privid) data_user_client.priv_id = 5

        // if (!req.session.userid) {
        //
        // }
        user_module.user_client_add(data_user_client, function (err, result1) {

            if (err) console.log(err)

            product_module.product_get_one(product, function (err, result2) {

                if (err) console.log('Error : ', err);

                if (result2.length > 0) {

                    let productPrice = result2[0].product_price

                    order_module.customer_order_get_all_count_year(function (err, countResult) {

                        if (err) console.log(err)

                        let orderYear = new Date().getFullYear()
                        let orderCount = countResult[0].order_count + 1
                        let orderRef = orderYear + "-" + orderCount.toString().padStart(5, "0")

                        let data_order = {

                            order_ref: orderRef,
                            order_date: new Date(),
                            order_status: 1,
                            order_total_price: productPrice,
                            delivery_type_id : input.delivery_type,
                            user_id: result1.insertId

                        };


                        if (input.othersCheckout == 1){

                            let data_cart = {cart_date : new Date(), cart_status : 1, user_id : result1.insertId}

                            cart_module.cart_add(data_cart,function (err,cartUserAdd) {

                                if (err) console.log(err)


                                let data_cart_p = {
                                    product_id : product,
                                    cart_id : cartUserAdd.insertId,
                                    product_qt_c : 1,
                                    // product_price_c : productPrice

                                };

                                if (subcat > 0) {
                                    product_sub_cat_module.product_sub_cat_get_one(product, subcat, function (err, result6) {
                                        if (err) console.log('error', err);
                                        console.log(result6)
                                        // product_price = result6[0].product_sub_cat_price
                                        subcat_name = result6[0].sub_cat_name
                                        data_cart_p.product_price_c = result6[0].product_sub_cat_price
                                        data_cart_p.product_info1_c = result6[0].sub_cat_name

                                        cart_p_module.cart_p_add(data_cart_p,function (err,cartpInsert) {

                                            if (err) console.log('error',err);


                                            console.log('othersCheckout .....')

                                            let session_data = {

                                                loggedin: true,
                                                username: input.name.trim(),
                                                name: input.name.trim(),
                                                lname: input.lastname.trim(),
                                                user_id: result1.insertId,
                                                privid: 5,
                                                cart_id: cartUserAdd.insertId,
                                                timeout: 3600000,
                                                location: '/'
                                            };

                                            session_module.session_create(req, res, session_data);

                                            console.log('connected')

                                            res.redirect("/checkout/products/list/1")
                                        })
                                    })
                                }
                                else {
                                    // product_price = result[0].product_price
                                    data_cart_p.product_price_c = productPrice
                                    cart_p_module.cart_p_add(data_cart_p,function (err,cartpInsert) {

                                        if (err) console.log('error',err);


                                        console.log('othersCheckout .....')

                                        let session_data = {

                                            loggedin: true,
                                            username: input.name.trim(),
                                            name: input.name.trim(),
                                            lname: input.lastname.trim(),
                                            user_id: result1.insertId,
                                            privid: 5,
                                            cart_id: cartUserAdd.insertId,
                                            timeout: 3600000,
                                            location: '/'
                                        };

                                        session_module.session_create(req, res, session_data);

                                        console.log('connected')

                                        res.redirect("/checkout/products/list/1")
                                    })
                                }

                            })

                        }
                        else {
                            order_module.customer_order_add(data_order, function (err, result3) {

                                if (err) console.log(err)

                                let data_order_product = {

                                    product_id: product,
                                    order_id: result3.insertId,
                                    product_qt_o: 1,
                                    // product_price_o: productPrice,
                                    product_order_status: 1

                                }

                                if (subcat > 0) {
                                    product_sub_cat_module.product_sub_cat_get_one(product, subcat, function (err, result6) {
                                        if (err) console.log('error', err);
                                        console.log(result6)
                                        // product_price = result6[0].product_sub_cat_price
                                        subcat_name = result6[0].sub_cat_name
                                        data_order_product.product_price_o = result6[0].product_sub_cat_price
                                        data_order_product.product_info1_o = result6[0].sub_cat_name


                                        order_p_module.order_p_add(data_order_product, function (err, result4) {

                                            if (err) console.log(err)

                                            let data_status = {

                                                stat_id: 1,
                                                order_id: result3.insertId,
                                                order_stat_date: new Date()

                                            }

                                            order_stat_module.order_stat_add(data_status, function (err, result5) {

                                                if (err) console.log(err)

                                                res.redirect("/success/checkout")

                                            })

                                        })
                                    })
                                }
                                else {
                                    // product_price = result[0].product_price
                                    data_order_product.product_price_o = productPrice

                                    order_p_module.order_p_add(data_order_product, function (err, result4) {

                                        if (err) console.log(err)

                                        let data_status = {

                                            stat_id: 1,
                                            order_id: result3.insertId,
                                            order_stat_date: new Date()

                                        }

                                        order_stat_module.order_stat_add(data_status, function (err, result5) {

                                            if (err) console.log(err)

                                            res.redirect("/success/checkout")

                                        })

                                    })
                                }

                            })
                        }

                    })

                } else {

                    res.redirect("/checkout/" + product + "?err=1")

                }

            })

        })

    } else {


        res.redirect("/checkout/" + product + "?err=1")


    }



}



module.exports = {

    checkout,
    checkout_valid,
    order_list,
    order_details

}
