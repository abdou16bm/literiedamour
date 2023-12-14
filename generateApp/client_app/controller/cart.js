


//MY MODULE
const cart_module = require("../../admin_app/lib/cart")
const cart_p_module = require("../../admin_app/lib/cart_p")





let cart_get_one_user = function (req,res) {

    let user_id = req.session.userid

    cart_module.cart_get_one_user(user_id,function (err,result1) {
        
        if (err) console.log(err)

        if (result1.length > 0) {
                          
            cart_p_module.cart_p_get_one_cart(result1[0].cart_id,function (err,result2) {

                if (err) console.log(err)
                    
                res.render("cart",{cart : result1, cart_p : result2, session : req.session, err : req.query.err})
                
                
            })

        } else {

            res.render("cart",{cart : [], cart_p : [], session : req.session, err : req.query.err})

        }
    
    })
    
}




module.exports = {

    cart_get_one_user

}