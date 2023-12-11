

// My controller
const product_module = require ("../lib/product")
const sub_category_module = require ("../lib/sub_category")
const brand_module = require ("../lib/brand")
const order_module = require ("../lib/customer_order")


let home=function(req,res){
  
  product_module.product_get_all_count(function (err,result1) {

    if (err) console.log(err)

    sub_category_module.sub_category_get_all_count(function (err,result2) {

      if (err) console.log(err)

      brand_module.brand_get_all_count(function (err,result3) {

        if (err) console.log(err)

        order_module.customer_order_get_all_count(function (err,result4) {

          if (err) console.log(err)

          console.log(req.session)
          res.render('home',
          {
            products : result1, 
            sub_category : result2, 
            brands : result3, 
            orders : result4, 
            session : req.session
          
          });
        
        })     
      
      })
      
    })
    
  })

}





exports.home=home;
