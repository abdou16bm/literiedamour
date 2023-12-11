const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const product_details_module = require('../lib/product_details');


const product_details_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
product_details_module.product_details_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
product_details_module.product_details_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({product_details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('product_details_list_page',{product_details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({product_details:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('product_details_list_page',{product_details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.product_details_list_page = product_details_list_page


const product_details_list = function (req,res) {
     product_details_module.product_details_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({product_details : result1, err : err, session : req.session});
         } else {
         res.render('product_details_list',{product_details : result1, err : err, session : req.session});
         }
});
};



exports.product_details_list = product_details_list


const product_details_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
product_details_module.product_details_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
product_details_module.product_details_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({product_details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('product_details_list_page_admin',{product_details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({product_details:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('product_details_list_page_admin',{product_details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.product_details_list_page_admin = product_details_list_page_admin


const product_details_list_admin = function (req,res) {
product_details_module.product_details_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_details : result1, err : err, session : req.session});
     } else {
     res.render('product_details_list_admin',{product_details : result1, err : err, session : req.session});
     }
  });
};



exports.product_details_list_admin = product_details_list_admin


const product_details_details = function (req,res) {
const id = req.params.id;
product_details_module.product_details_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_details : result1, err : err, session : req.session});
     } else {
     res.render('product_details_details',{product_details : result1, err : err, session : req.session});
     }
});
};



exports.product_details_details = product_details_details


const product_details_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'product_details',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     product_details_module.product_details_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({product_details : result1, err : err, session : req.session});
         } else {
         res.render('product_details_edit',{product_details : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.product_details_edit = product_details_edit


const product_details_edit_save = function (req,res) {

     const product_id = req.params.product
     const detail_id = req.params.detail
     const options = {
          multiples : true,
          uploadDir: './admin_app/uploads'
     };
  
     var form = new formidable.IncomingForm(options);
  
     form.parse(req, function (err, fields, files) {
  
          let body = fields;

          console.log(body)
  
          if (
              
               typeof(body.detail_desig) != "undefined" && body.detail_desig != null && body.detail_desig != ""
               
          ) {

               let data_update = {

                    detail_desig : body.detail_desig.trim()

               };
               
               product_details_module.product_details_update(product_id,detail_id,data_update,function (err,result1) {
                    
                    if (err)   console.log('error',err)

                    if(req.baseUrl == "/api") {
                    res.send({insert_result : result1, err : err, session : req.session});
                    } else {
                    res.redirect("/product/"+product_id+"/sheet?err=0")
                    }

        
               });
  
          } else {res.redirect("/product/"+product_id+"/sheet?err=2")}
     
     })
};



exports.product_details_edit_save = product_details_edit_save


const product_details_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'product_details',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('product_details_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.product_details_add = product_details_add


const product_details_add_save = function (req,res) {
     const options = {
          multiples : true,
          uploadDir: './admin_app/uploads'
     };
  
     var form = new formidable.IncomingForm(options);
  
     form.parse(req, function (err, fields, files) {
  
          let body = fields;

          console.log(body)
  
          if (
              
               typeof(body.detail_desig) != "undefined" && body.detail_desig != null && body.detail_desig != ""
               && typeof(body.detail_id) != "undefined" && body.detail_id != null && body.detail_id != ""
               
          ) {

               let data_insert = {

                    detail_id : body.detail_id,
                    product_id : body.product_id,
                    detail_desig : body.detail_desig.trim()

               };
               
               product_details_module.product_details_add(data_insert,function (err,result1) {
                    
                    if (err) {

                         res.redirect("/product/"+body.product_id+"/sheet?err=3")
                         console.log('error',err)

                    } else {

                         if(req.baseUrl == "/api") {
                         res.send({insert_result : result1, err : err, session : req.session});
                         } else {
                         res.redirect("/product/"+body.product_id+"/sheet?err=0")
                         }

                    }
        
               });
  
          } else {res.redirect("/product/"+body.product_id+"/sheet?err=2")}
     
     })
};



exports.product_details_add_save = product_details_add_save


const product_details_delete = function (req,res) {

     const product_id = req.params.product
     const detail_id = req.params.detail


     product_details_module.product_details_delete(product_id,detail_id,function (err,result1) {

          if (err) {
               
               res.redirect('/product/'+product_id+'/sheet?err=1');
               console.log('error',err);
          
          } else {

               if(req.baseUrl == "/api") {
               res.send({delete_result : result1, err : err, session : req.session});
               } else {
               res.redirect('/product/'+product_id+'/sheet?err=0');
               }

          }
     });

};



exports.product_details_delete = product_details_delete


const product_details_filter = function (req,res) {
const filter = req.params.filter;
product_details_module.product_details_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({product_details : result1, err : err, session : req.session});
     } else {
     res.render('product_details_list_admin',{product_details : result1, err : err, session : req.session});
     }
});
};



exports.product_details_filter = product_details_filter


