// MY MODULES

const product_module = require ("../../admin_app/lib/product")
const wilaya_module = require ("../../admin_app/lib/wilaya")
const user_module = require ("../../admin_app/lib/user")
const order_module = require ("../../admin_app/lib/customer_order")
const order_p_module = require ("../../admin_app/lib/order_p")
const order_stat_module = require ("../../admin_app/lib/order_stat")



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

    user_module.user_get_one(req.session.userid,function (err,result3){
        if (err) console.log(err)

        product_module.product_get_one_client(product,function (err,result1) {

            if (err) console.log(err)

            wilaya_module.wilaya_get_all(function (err,result2) {

                res.render('checkout',{product : result1, wilaya : result2, user: result3 , session : req.session, err : req.query.err});

            })
        })
    })
}


const checkout_valid = function (req, res) {

    const product = req.params.product
    const input = req.body

    console.log("checkoutValid")

    if (

        typeof (input.lastname) != "undefined" && input.lastname != null && input.lastname != ""
        && typeof (input.name) != "undefined" && input.name != null && input.name != ""
        && typeof (input.phone) != "undefined" && input.phone != null && input.phone != ""
        && typeof (input.address) != "undefined" && input.address != null && input.address != ""
        && typeof (input.wilaya) != "undefined" && input.wilaya != null && input.wilaya != ""

    ) {


        let data_user_client = {

            user_id : req.session.userid,
            user_name: input.name.trim(),
            user_lastname: input.lastname.trim(),
            user_address: input.address.trim(),
            user_phone: input.phone.trim(),
            //order_info : input.order_info.trim()
            wilaya_id: input.wilaya,
            user_status: 1,
            priv_id: 5

        };

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
                            user_id: result1.insertId

                        };

                        order_module.customer_order_add(data_order, function (err, result3) {

                            if (err) console.log(err)

                            let data_order_product = {

                                product_id: product,
                                order_id: result3.insertId,
                                product_qt_o: 1,
                                product_price_o: productPrice,
                                product_order_status: 1

                            }

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
