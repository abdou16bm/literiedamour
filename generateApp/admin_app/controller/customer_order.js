const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const customer_order_module = require('../lib/customer_order');
 const order_p_module = require('../lib/order_p');
 const order_stat_module = require('../lib/order_stat');
 const product_module = require("../lib/product")


const customer_order_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
customer_order_module.customer_order_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
customer_order_module.customer_order_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({customer_order : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('customer_order_list_page',{customer_order : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({customer_order:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('customer_order_list_page',{customer_order : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.customer_order_list_page = customer_order_list_page


const customer_order_list = function (req,res) {
     
     customer_order_module.customer_order_get_all(function (err,result1) {
     if (err) console.log('error',err);
     console.log(result1)
     if(req.baseUrl == "/api") {
     res.send({orders : result1, err : req.query.err, session : req.session});
     } else {
     res.render('orders_list',{orders : result1, err : req.query.err, session : req.session});
     }
});
};



exports.customer_order_list = customer_order_list


const customer_order_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
customer_order_module.customer_order_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
customer_order_module.customer_order_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({customer_order : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('customer_order_list_page_admin',{customer_order : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({customer_order:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('customer_order_list_page_admin',{customer_order : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.customer_order_list_page_admin = customer_order_list_page_admin


const customer_order_list_admin = function (req,res) {
customer_order_module.customer_order_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({customer_order : result1, err : err, session : req.session});
     } else {
     res.render('customer_order_list_admin',{customer_order : result1, err : err, session : req.session});
     }
  });
};



exports.customer_order_list_admin = customer_order_list_admin


const customer_order_details = function (req,res) {
     
     const id = req.params.id;
     
     customer_order_module.customer_order_get_one(id,function (err,result1) {
     
          if (err) console.log('error',err);

          order_p_module.order_p_get_all_order(id,function (err,result2) {
              
               if (err) console.log('error',err); 

               if(req.baseUrl == "/api") {
               res.send({order : result1, order_p : result2, err : err, session : req.session});
               } else {
               res.render('order_details',{order : result1, order_p : result2, err : err, session : req.session});
               }

          })

     });

};



exports.customer_order_details = customer_order_details


const customer_order_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'customer_order',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     customer_order_module.customer_order_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({customer_order : result1, err : err, session : req.session});
         } else {
         res.render('customer_order_edit',{customer_order : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.customer_order_edit = customer_order_edit


const customer_order_edit_save = function (req,res) {
const id = req.params.id;
//let input = JSON.parse(JSON.stringify(req.body));
//let data_update = input
    const options = {
        multiples : true,
        uploadDir: './admin_app/uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let input = fields;
        if (typeof input.user_id != 'undefined')  input.user_id = req.session.userid;

        let data_update =input;
      customer_order_module.customer_order_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./admin_app/public/img/customer_order/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./admin_app/public/img/customer_order/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             customer_order_module.customer_order_update(id,{customer_order_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/customer_order/admin/page/1');
     }
});
    })
};



exports.customer_order_edit_save = customer_order_edit_save


const customer_order_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'customer_order',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('customer_order_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.customer_order_add = customer_order_add


const customer_order_add_save = function (req,res) {
//let input = JSON.parse(JSON.stringify(req.body));
//let data_insert = input
    const options = {
        multiples : true,
        uploadDir: './admin_app/uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let input = fields;
        if (typeof input.user_id != 'undefined')  input.user_id = req.session.userid;

        let data_insert =input;
customer_order_module.customer_order_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./admin_app/public/img/customer_order/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./admin_app/public/img/customer_order/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    customer_order_module.customer_order_update(result1.insertId,{customer_order_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/customer_order/admin/page/1');
     }
});
    })
};



exports.customer_order_add_save = customer_order_add_save


const customer_order_delete = function (req,res) {
const id = req.params.id;
customer_order_module.customer_order_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/customer_order/admin/page/1');
     }
});
};



exports.customer_order_delete = customer_order_delete


const customer_order_filter = function (req,res) {
const filter = req.params.filter;
customer_order_module.customer_order_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({customer_order : result1, err : err, session : req.session});
     } else {
     res.render('customer_order_list_admin',{customer_order : result1, err : err, session : req.session});
     }
});
};



exports.customer_order_filter = customer_order_filter



const order_status_update = function (req,res) {

     const order_id = req.params.order
     const status = req.params.status

     let data_update = {

          stat_id : status,
          order_stat_date : new Date()

     }

     order_stat_module.order_stat_update(order_id,data_update,function (err,result1) {

          if (err) {

               res.redirect("/order/"+order_id+"/details?err=1")
               console.log(err)

          } else {

               if (status == 4) {product_module.product_update_qt_order(order_id,(err,qtUpdate)=>{if (err) console.log(err)})}

               res.redirect("/order/"+order_id+"/details")

          }

          
          
     })
     
}


exports.order_status_update = order_status_update





const customer_order_print = function (req,res) {
     
     const id = req.params.id;
     
     customer_order_module.customer_order_get_one(id,function (err,result1) {
     
          if (err) console.log('error',err);

          order_p_module.order_p_get_all_order(id,function (err,result2) {
              
               if (err) console.log('error',err); 

               if(req.baseUrl == "/api") {
               res.send({order : result1, order_p : result2, err : err, session : req.session});
               } else {
               res.render('invoice',{order : result1, order_p : result2, err : err, session : req.session});
               }

          })

     });

};


exports.customer_order_print = customer_order_print