// MY MODULES

const product_module = require ("../../admin_app/lib/product")
const wilaya_module = require ("../../admin_app/lib/wilaya")
const user_module = require ("../../admin_app/lib/user")
const order_module = require ("../../admin_app/lib/customer_order")
const order_p_module = require ("../../admin_app/lib/order_p")
const order_stat_module = require ("../../admin_app/lib/order_stat")



const checkout = function (req, res) {
    
    const product = req.params.product

    product_module.product_get_one_client(product,function (err,result1) {

        if (err) console.log(err)

        wilaya_module.wilaya_get_all(function (err,result2) {

            res.render('checkout',{product : result1, wilaya : result2, err : req.query.err});
            
        })
    
    
    })

}


const checkout_valid = function (req, res) {
    
    const product = req.params.product
    const input = req.body

    if (
        
        typeof(input.lastname) != "undefined" && input.lastname != null && input.lastname != "" 
        && typeof(input.name) != "undefined" && input.name != null && input.name != ""
        && typeof(input.phone) != "undefined" && input.phone != null && input.phone != "" 
        && typeof(input.address) != "undefined" && input.address != null && input.address != ""
        && typeof(input.wilaya) != "undefined" && input.wilaya != null && input.wilaya != ""

    ) {


        let data_user_client = {

            user_name    : input.name.trim(),
            user_lastname : input.lastname.trim(),
            user_address   : input.address.trim(),
            user_phone   : input.phone.trim(),
            //order_info : input.order_info.trim()
            wilaya_id  : input.wilaya,
            user_status   : 1,
            priv_id : 5

        };

        user_module.user_client_add(data_user_client,function (err,result1) {

            if (err) console.log(err)

            product_module.product_get_one(product,function (err,result2){

                if (err) console.log('Error : ',err);
            
                if (result2.length > 0) {
                    
                    let productPrice = result2[0].product_price
            
                    let data_order = {
    
                        order_date : new Date(),
                        order_status : 1,
                        order_total_price : productPrice,
                        user_id : result1.insertId
    
                    };
                
                    
                    order_module.customer_order_add(data_order,function (err,result3) {
    
                        if (err) console.log(err)

                        let data_order_product = {

                            product_id : product,
                            order_id : result3.insertId,
                            product_qt_o : 1,
                            product_price_o : productPrice,
                            product_order_status : 1

                        }

                        order_p_module.order_p_add(data_order_product,function (err,result4) {

                            if (err) console.log(err)

                            let data_status = {

                                stat_id : 1,
                                order_id : result3.insertId,
                                order_stat_date : new Date()
    
                            }
    
                            order_stat_module.order_stat_add(data_status,function (err,result5) {
                               
                                if (err) console.log(err)
                   
                                res.redirect("/success/checkout")                       
                                
                            })
                            
                        })

                    })

                } else {

                    res.redirect("/checkout/"+product+"?err=1")
                
                }
         
            })
            
        })

    }
    else {


        res.redirect("/checkout/"+product+"?err=1")


    }

}



module.exports = {

    checkout,
    checkout_valid

}