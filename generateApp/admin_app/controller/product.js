const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../lib/doc');
const { foreignDatas_GetAll } = require('../lib/default_lib');
const { db } = require('../lib/database');
const product_module = require('../lib/product');
const brand_module = require('../lib/brand');
const property_module = require('../lib/property');
const sub_category_module = require('../lib/sub_category');
const product_details_module = require('../lib/product_details');
const details_module = require('../lib/details');
const category_module = require("../lib/category");
const product_sub_cat_module = require("../lib/product_sub_cat")


const product_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
product_module.product_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
product_module.product_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('product_list_page',{product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({product:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('product_list_page',{product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.product_list_page = product_list_page


const product_list = function (req,res) {
     product_module.product_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({products : result1, err : err, session : req.session});
         } else {
         res.render('products_list',{products : result1, err : req.query.err, session : req.session});
         }
});
};



exports.product_list = product_list


const product_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
product_module.product_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
product_module.product_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('product_list_page_admin',{product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({product:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('product_list_page_admin',{product : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.product_list_page_admin = product_list_page_admin


const product_list_admin = function (req,res) {
product_module.product_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product : result1, err : err, session : req.session});
     } else {
     res.render('product_list_admin',{product : result1, err : err, session : req.session});
     }
  });
};



exports.product_list_admin = product_list_admin


const product_details = function (req,res) {
const id = req.params.id;
product_module.product_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product : result1, err : err, session : req.session});
     } else {
     res.render('product_details',{product : result1, err : err, session : req.session});
     }
});
};



exports.product_details = product_details


const product_edit = function (req,res) {

     const id = req.params.id;

     product_module.product_get_one(id,function (err,result1) {

        if (err) console.log('error',err);

          brand_module.brand_get_all(function (err,result2) {

               if (err) {console.log(err)}

               property_module.property_get_all_color(function (err,result3) {

                    if (err) {console.log(err)}
        
                    category_module.category_get_all(function (err,result4) {

                         if (err) {console.log(err)}

                         if(req.baseUrl == "/api") {
                         res.send({product : result1, brands : result2, property : result3, category : result4, err : req.query.err, session : req.session});
                         } else {
                         res.render('product_edit',{product : result1, brands : result2, property : result3, category : result4, err : req.query.err, session : req.session});
                         }

                    })

               })

          })

     });

};



exports.product_edit = product_edit


const product_edit_save = function (req,res) {

     const id = req.params.id;
     const options = {
         multiples : true,
        // uploadDir: './uploads'
        uploadDir: './uploads'
     };

     let form = new formidable.IncomingForm(options);

     form.parse(req, function (err, fields, files) {

         let body = fields;

         if (

          typeof(body.product_ref) != 'undefined' && body.product_ref != null && body.product_ref != ""
          && typeof(body.product_name) != 'undefined' && body.product_name != null && body.product_name != ""
          && typeof(body.product_category) != 'undefined' && body.product_category != null && body.product_category != ""
/*           && typeof(body.product_brand) != 'undefined' && body.product_brand != null && body.product_brand != "" */
          && typeof(body.product_price) != 'undefined' && body.product_price != null && body.product_price != ""
          && typeof(body.product_quantity) != 'undefined' && body.product_quantity != null && body.product_quantity != ""

          ) {


               let data_product = {

                    product_ref : body.product_ref.trim(),
                    product_name : body.product_name.trim(),
                    product_desig : body.product_desig.trim(),
                    product_price : body.product_price.trim(),
                    product_qt : body.product_quantity.trim(),
                    cat_id : body.product_category.trim(),
                    brand_id : 1

               }

               product_module.product_update(id,data_product,function (err,result1) {

                    if (err) {console.log(err)}            
                    
                    product_sub_cat_module.product_sub_cat_delete(id,(err,resultDelete)=>{

                         if (typeof(body.product_sub_cat) != 'undefined') {

                              let sub_cat_list = body.product_sub_cat
                              if (Array.isArray(sub_cat_list) == false) sub_cat_list = sub_cat_list.split() 
                              sub_cat_list.forEach(sub_cat => 
                              product_sub_cat_module.product_sub_cat_add({product_id : id,sub_cat_id : sub_cat}));

                         }

                    })               

                    doc_module.uploadFile('./admin_app/public/img/product/',id,files,'main','main','jpg', function (err,count1){

                         if (err) console.log(err)

                         console.log('count1 : ',count1)

                         product_module.product_update(id,{product_imgcount:count1})


                    })

                    doc_module.uploadMultiFile('./admin_app/public/img/product/',id,files,'jpg', function (err,count2){

                         if (err) console.log(err)

                         console.log('count2 : ',count2)

                         product_module.product_update(id,{product_imgcount:count2})

                    })


                    res.redirect("/products/list?err=0")


               })



          } else {res.redirect("/product/"+id+"/edit?err=1")}


     })
 }




exports.product_edit_save = product_edit_save


const product_add = function (req,res) {

     brand_module.brand_get_all(function (err,result1) {

          if (err) {console.log(err)}

          property_module.property_get_all_color(function (err,result2) {

               if (err) {console.log(err)}

               category_module.category_get_all(function (err,result3) {

                    if (err) {console.log(err)}

                    res.render("product_add",{brands : result1, property : result2, category : result3, session : req.session, err : req.query.err})

               })

          })

     })

};



exports.product_add = product_add


const product_add_save = function (req,res) {

     const options = {
         multiples : true,
         //uploadDir: './uploads'
         uploadDir: './uploads'
     };

     let form = new formidable.IncomingForm(options);

     form.parse(req, function (err, fields, files) {

         let body = fields;

         if (

          typeof(body.product_ref) != 'undefined' && body.product_ref != null && body.product_ref != ""
          && typeof(body.product_name) != 'undefined' && body.product_name != null && body.product_name != ""
          && typeof(body.product_category) != 'undefined' && body.product_category != null && body.product_category != ""
   /*        && typeof(body.product_brand) != 'undefined' && body.product_brand != null && body.product_brand != "" */
          && typeof(body.product_price) != 'undefined' && body.product_price != null && body.product_price != ""
          && typeof(body.product_quantity) != 'undefined' && body.product_quantity != null && body.product_quantity != ""

          ) {


               let data_product = {

                    product_ref : body.product_ref.trim(),
                    product_name : body.product_name.trim(),
                    product_desig : body.product_desig.trim(),
                    product_price : body.product_price.trim(),
                    product_qt : body.product_quantity.trim(),
                    cat_id : body.product_category.trim(),
                    brand_id : 1,
                    shop_id : 1

               }

               product_module.product_add(data_product,function (err,result1) {

                    if (err) {console.log(err)}

                    if (typeof(body.product_sub_cat) != 'undefined') {
                         
                         let sub_cat_list = body.product_sub_cat
                         if (Array.isArray(sub_cat_list) == false) sub_cat_list = sub_cat_list.split() 
                         sub_cat_list.forEach(sub_cat => 
                         product_sub_cat_module.product_sub_cat_add({product_id : result1.insertId,sub_cat_id : sub_cat}));

                    }
    
                    doc_module.uploadFile('./admin_app/public/img/product/',result1.insertId,files,'main','main','jpg', function (err,count1){

                         if (err) console.log(err)

                         console.log('count1 : ',count1)

                         product_module.product_update(result1.insertId,{product_imgcount:count1})


                    })

                    doc_module.uploadMultiFile('./admin_app/public/img/product/',result1.insertId,files,'jpg', function (err,count2){

                         if (err) console.log(err)

                         console.log('count2 : ',count2)

                         product_module.product_update(result1.insertId,{product_imgcount:count2})

                    })


                    res.redirect("/products/list?err=0")


               })



          } else {res.redirect("/product/add?err=1")}


     })
 }



exports.product_add_save = product_add_save


const product_delete = function (req,res) {
const id = req.params.id;
product_module.product_delete(id,function (err,result1) {

     if (err) {

          console.log('error',err)
          res.redirect("/products/list?err=1")

     } else {

          if(req.baseUrl == "/api") {
          res.send({delete_result : result1, err : err, session : req.session});
          } else {
          res.redirect('/products/list?err=0');
          }

     }

});
};



exports.product_delete = product_delete


const product_filter = function (req,res) {
const filter = req.params.filter;
product_module.product_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product : result1, err : err, session : req.session});
     } else {
     res.render('product_list_admin',{product : result1, err : err, session : req.session});
     }
});
};



exports.product_filter = product_filter





const product_data_sheet = function (req,res) {

     const product_id = req.params.id

     product_module.product_get_one(product_id,function (err,result1) {

          if (err) {console.log(err)}

          if (result1.length > 0 ) {

               let sub_cat = result1[0].sub_cat_id

               //console.log("product : ",result1)

               product_details_module.product_details_get_all_product(product_id,function (err,result2) {

                    if (err) {console.log(err)}

                    details_module.details_get_all_sub_category(sub_cat,function (err,result3) {

                         if (err) {console.log(err)}

                         if(req.baseUrl == "/api") {
                         res.send({product : result1, product_details : result2, details : result3, err : req.query.err, session : req.session});
                         } else {
                         res.render('product_data_sheet',{product : result1, product_details : result2, details : result3, err : req.query.err, session : req.session});
                         }


                    })

               })

          } else {

               if(req.baseUrl == "/api") {
               res.send({product : [], product_details : [], details : [], err : req.query.err, session : req.session});
               } else {
               res.render('product_data_sheet',{product : [], product_details : [], details : [], err : req.query.err, session : req.session});
               }

          }

     })

}


exports.product_data_sheet = product_data_sheet




const product_qt_edit = function (req,res) {

     const product_id = req.params.id

     const input = req.body

     console.log(input)

     product_module.product_stock_update(product_id,input.quantity,function (err,result1) {

          if (err)console.log(err)

          res.redirect("/stock")

     })

}


exports.product_qt_edit = product_qt_edit
