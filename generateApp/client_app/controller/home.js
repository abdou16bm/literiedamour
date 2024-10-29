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

        result1.forEach(cat => sub_category_module.sub_category_get_all(cat["cat_id"],(err,resultCatSubCat) => cat["subcat"] = resultCatSubCat));

        sub_category_module.sub_category_get_all_client(function (err,result_subcat) {

            for (let i = 0; i < result_subcat.length; i++) {

                product_module.product_get_all_subcat(result_subcat[i].sub_cat_id,function (err,products) {

                    if (err) console.log(err)

                    result_subcat[i].products = products

                })

            }

            product_module.product_get_all_top(12,function (err,result2) {

                if (err) console.log(err)
                // console.log(result1)
                res.render('home',{product_top : result2, category : result1, sub_category : result_subcat, banner : dataBanner, err : err, session : req.session});


            })

        })

    })

}



module.exports={

    home

}
