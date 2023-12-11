const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const delivery_price_module = require('../lib/delivery_price');


const delivery_price_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
delivery_price_module.delivery_price_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
delivery_price_module.delivery_price_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({delivery_price : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('delivery_price_list_page',{delivery_price : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({delivery_price:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('delivery_price_list_page',{delivery_price : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.delivery_price_list_page = delivery_price_list_page


const delivery_price_list = function (req,res) {
     
     let shop_id = req.session.shop_id

     delivery_price_module.delivery_price_get_all_wilaya(shop_id,function (err,result1) {
        
          if (err) console.log('error',err);
        
          if(req.baseUrl == "/api") {
          res.send({delivery_price : result1, err : req.query.err, session : req.session});
          } else {
          res.render('delivery_price_list',{delivery_price : result1, err : req.query.err, session : req.session});
          }
    
     });

};



exports.delivery_price_list = delivery_price_list


const delivery_price_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
delivery_price_module.delivery_price_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
delivery_price_module.delivery_price_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({delivery_price : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('delivery_price_list_page_admin',{delivery_price : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({delivery_price:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('delivery_price_list_page_admin',{delivery_price : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.delivery_price_list_page_admin = delivery_price_list_page_admin


const delivery_price_list_admin = function (req,res) {
delivery_price_module.delivery_price_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delivery_price : result1, err : err, session : req.session});
     } else {
     res.render('delivery_price_list_admin',{delivery_price : result1, err : err, session : req.session});
     }
  });
};



exports.delivery_price_list_admin = delivery_price_list_admin


const delivery_price_details = function (req,res) {
const id = req.params.id;
delivery_price_module.delivery_price_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delivery_price : result1, err : err, session : req.session});
     } else {
     res.render('delivery_price_details',{delivery_price : result1, err : err, session : req.session});
     }
});
};



exports.delivery_price_details = delivery_price_details


const delivery_price_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'delivery_price',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     delivery_price_module.delivery_price_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({delivery_price : result1, err : err, session : req.session});
         } else {
         res.render('delivery_price_edit',{delivery_price : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.delivery_price_edit = delivery_price_edit


const delivery_price_edit_save = function (req,res) {
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
      delivery_price_module.delivery_price_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./admin_app/public/img/delivery_price/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./admin_app/public/img/delivery_price/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             delivery_price_module.delivery_price_update(id,{delivery_price_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/delivery_price/admin/page/1');
     }
});
    })
};



exports.delivery_price_edit_save = delivery_price_edit_save


const delivery_price_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'delivery_price',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('delivery_price_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.delivery_price_add = delivery_price_add


const delivery_price_add_save = function (req,res) {
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
delivery_price_module.delivery_price_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./admin_app/public/img/delivery_price/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./admin_app/public/img/delivery_price/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    delivery_price_module.delivery_price_update(result1.insertId,{delivery_price_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/delivery_price/admin/page/1');
     }
});
    })
};



exports.delivery_price_add_save = delivery_price_add_save


const delivery_price_delete = function (req,res) {
const id = req.params.id;
delivery_price_module.delivery_price_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/delivery_price/admin/page/1');
     }
});
};



exports.delivery_price_delete = delivery_price_delete


const delivery_price_filter = function (req,res) {
const filter = req.params.filter;
delivery_price_module.delivery_price_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delivery_price : result1, err : err, session : req.session});
     } else {
     res.render('delivery_price_list_admin',{delivery_price : result1, err : err, session : req.session});
     }
});
};



exports.delivery_price_filter = delivery_price_filter



const delivery_price_update = (req,res) => {

     let shop = req.session.shop_id
     let wilaya = req.params.wilaya
     let price = req.params.price
 
     let data_delivery = {shop_id : shop,wilaya_id : wilaya, delivery_price: price}
     
     delivery_price_module.delivery_add_one(wilaya,shop,data_delivery,(err,result)=>{
 
         if (err) {console.log(err)} 
         
         res.send({resultInsert : result, session : req.session, err : err})
 
     })
 
 }

 exports.delivery_price_update = delivery_price_update