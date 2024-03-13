// MY MODULES
const brand_module = require ("../../admin_app/lib/brand")
const category_module = require ("../../admin_app/lib/category")
const sub_category_module = require ("../../admin_app/lib/sub_category")
const product_module = require ("../../admin_app/lib/product")

const fs = require("fs")



const home = function (req, res) {


    let dataBanner = {}

    if (fs.existsSync('./admin_app/public/img/banner/data.ini')) {

        let file_content = fs.readFileSync('./admin_app/public/img/banner/data.ini',{encoding : 'utf-8'})
        file_content = JSON.parse(file_content);

        console.log("file banner content : ",file_content)

        if (typeof(file_content.text) != 'undefined') dataBanner = file_content

    }


    category_module.category_get_all(function (err,result1) {

        if (err) console.log(err)

        for (let i = 0; i < result1.length; i++) {

            product_module.product_get_all_client(result1[i].cat_id,function (err,cat_products) {

                if (err) console.log(err)

                result1[i].products = cat_products

            })

        }

        product_module.product_get_all_top(12,function (err,result2) {

            if (err) console.log(err)
            //console.log(result1)
            res.render('home',{product_top : result2, category : result1, banner : dataBanner, err : err, session : req.session});


        })


    })


}



module.exports={

    home

}
