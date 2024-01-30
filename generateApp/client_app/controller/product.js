

// MY MODULES

const product_module = require ("../../admin_app/lib/product")
const product_details_module = require ("../../admin_app/lib/product_details")
const brand_module = require ("../../admin_app/lib/brand")
const category_module = require ("../../admin_app/lib/category")
const sub_category_module = require ("../../admin_app/lib/sub_category")



const product_details = function (req, res) {

    const id = req.params.id

    product_module.product_get_one_client(id,function (err,result1) {

        if (err) console.log(err)
        console.log(result1)

        product_details_module.product_details_get_all_product_client(id,function (err,result2) {

            if (err) console.log(err)

            product_module.product_get_all_limit_filter({cat : result1[0].sub_cat_id},1,6,'table_pk','DESC',function (err,result3){

                if (err) console.log(err)

                res.render('product_details',{product : result1, product_details : result2, product_similar : result3, session : req.session, err : err});
            })

        })

    })

}



const product_list_page = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;

    let filterObj = {}

    let urlQuery = ""

    if ( typeof(req.url.split("?")[1]) != "undefined" && req.url.split("?")[1] != null && req.url.split("?")[1] != "") {

        urlQuery = "?"+req.url.split("?")[1]

    }


    if (typeof(req.query.catP) != "undefined" && req.query.catP != null && req.query.catP != "") {

        filterObj.catP = req.query.catP

    }
    if (typeof(req.query.cat) != "undefined" && req.query.cat != null && req.query.cat != "") {

        filterObj.cat = req.query.cat

    }
    if (typeof(req.query.bprice) != "undefined" && req.query.bprice != null && req.query.bprice != "") {

        filterObj.bprice = req.query.bprice
    }
    if (typeof(req.query.eprice) != "undefined" && req.query.eprice != null && req.query.eprice != "") {

        filterObj.eprice = req.query.eprice
    }
    if (typeof(req.query.brand) != "undefined" && req.query.brand != null && req.query.brand != "") {

        filterObj.brand = req.query.brand

    }
    if (typeof(req.query.product) != "undefined" && req.query.product != null && req.query.product != "") {

        filterObj.product = req.query.product

    }

    brand_module.brand_get_all_client(function (err,result1) {

        if (err) console.log(err)

        category_module.category_get_all(function (err,result5) {

            if (err) console.log(err)

            sub_category_module.sub_category_get_all_client(function (err,result2) {

                if (err) console.log(err)

                //console.log("filter : ",filterObj)
                product_module.product_count_page_filter(filterObj,limit_page,function (err,result3) {
                    if (err) console.log('err : ',err) ;
                    if (Array.isArray(result3) == true && result3.length)
                    {
                        if (result3[0].count_p > 0) count_page = result3[0].count_p;
                        product_module.product_get_all_limit_filter(filterObj,current_page*limit_page,limit_page,'table_pk','DESC',function (err,result4) {

                            if (err) console.log('error',err);

                            if(req.baseUrl == "/api") {
                                res.send({products : result4, brands : result1, category : result5, sub_category : result2, urlQuery: urlQuery, info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                            } else {
                                if (req.baseUrl == "/checkout") res.render('products_list_checkout',{products : result4, brands : result1, category : result5, sub_category : result2, urlQuery: urlQuery, info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
                                else res.render('products_list',{products : result4, brands : result1, category : result5, sub_category : result2, urlQuery: urlQuery, info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                            }

                        })
                    }
                    else {
                        if(req.baseUrl == "/api") {
                            res.send({products:[], brands : result1, category : result5, sub_category : result2, urlQuery: urlQuery, info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
                        } else {
                            if (req.baseUrl == "/checkout") res.render('products_list_checkout',{products : [], brands : result1, category : result5, sub_category : result2, urlQuery: urlQuery, info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                            else res.render('products_list',{products : [], brands : result1, category : result5, sub_category : result2, urlQuery: urlQuery, info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                        }
                    }
                })
            })

        })

    })

};




const product_compare_choice = function (req, res) {

    let product1 = req.params.p1


    product_module.product_get_one_client(product1,function (err,result1) {

        if (err) console.log(err)

        if (result1.length > 0) {

            product_details_module.product_details_get_all_product_client(product1,function (err,resul2) {

                if (err) console.log(err)


                product_module.product_get_all_client(result1[0].sub_cat_id,function (err,resul3) {

                    if (err) console.log(err)

                    brand_module.brand_get_all_client(function (err,result4) {

                        if (err) console.log(err)


                        res.render('products_compare_choice',{product1 : result1, product1_details : resul2, products : resul3, brands : result4, session : req.session, err : err});


                    })

                })

            })

        } else {

            res.render('products_compare_choice',{product1 : [], product1_details : [], products : [], brands : [], session : req.session, err : err});

        }

    })

}



const product_compare = function (req, res) {

    const product1 = req.params.p1
    const product2 = req.params.p2

    if (typeof(product1) != "undefined" && product1 != null && product1 != "" && typeof(product2) != "undefined" && product2 != null && product2 != "") {

        if (product1 != product2) {

            product_module.product_get_one_client(product1,function (err,result1) {

                if (err) console.log(err)

                product_details_module.product_details_get_all_product_client(product1,function (err,resul2) {

                    if (err) console.log(err)

                    product_module.product_get_one_client(product2,function (err,result3) {

                        if (err) console.log(err)

                        product_details_module.product_details_get_all_product_client(product2,function (err,result4) {

                            if (err) console.log(err)

                            res.render('products_compare',{product1 : result1, product1_details : resul2, product2 : result3, product2_details : result4, session : req.session, err : err});

                        })


                    })

                })

            })

        } else {

            res.render('products_compare',{product1 : [], product1_details : [], product2 : [], product2_details : [], sameProduct : true, session : req.session, err : err});

        }



    } else {

        res.render('products_compare',{product1 : [], product1_details : [], product2 : [], product2_details : [], session : req.session, err : err});

    }


}


module.exports = {

    product_details,
    product_list_page,
    product_compare_choice,
    product_compare

}
