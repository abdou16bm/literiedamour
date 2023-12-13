const cart_p_add_save = function (req,res) {

    let product_id = req.query.product
    let cart_id = req.session.cart_id

    console.log("productId : ",product_id)
    console.log("cartId : ",cart_id)

    product_module.product_get_one(product_id,function (err,result) {

         if (err) console.log(err)

         console.log("productPrice : ",result[0].product_price)

         let data_insert = {
              
              product_id : product_id, 
              cart_id : cart_id, 
              product_qt_c : 1, 
              product_price_c : result[0].procut_price
         
         };

         cart_p_module.cart_p_add(data_insert,function (err,result1) {
              
              if (err) console.log('error',err);
    
              if(req.baseUrl == "/api") {
                res.send({insert_result : result1, err : err, session : req.session});
              } else {
                res.redirect('/cart_p/admin/page/1');
              }
         
         });
         
    })
   
};



exports.cart_p_add_save = cart_p_add_save