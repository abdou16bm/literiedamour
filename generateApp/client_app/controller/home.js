// MY MODULES
const brand_module = require ("../../admin_app/lib/brand")
const sub_category_module = require ("../../admin_app/lib/sub_category")
const product_module = require ("../../admin_app/lib/product")



const home = function (req, res) {


    sub_category_module.sub_category_get_all_client(function (err,result1) {

        if (err) console.log(err)

        for (let i = 0; i < result1.length; i++) {
            
            product_module.product_get_all_client(result1[i].sub_cat_id,function (err,subcat_products) {

                if (err) console.log(err)

                result1[i].products = subcat_products
            
            })
            
        }

        brand_module.brand_get_all_client(function (err,result2) {

            if (err) console.log(err)
            //console.log(result1)
            res.render('home',{brands : result2, sub_category : result1, err : err, session : req.session});
            
    
    
        })
    
    
    })
        

}



module.exports={

    home

}