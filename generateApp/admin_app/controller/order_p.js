const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const order_p_module = require('../lib/order_p');


const order_p_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
order_p_module.order_p_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
order_p_module.order_p_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({order_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('order_p_list_page',{order_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({order_p:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('order_p_list_page',{order_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.order_p_list_page = order_p_list_page


const order_p_list = function (req,res) {
     order_p_module.order_p_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({order_p : result1, err : err, session : req.session});
         } else {
         res.render('order_p_list',{order_p : result1, err : err, session : req.session});
         }
});
};



exports.order_p_list = order_p_list


const order_p_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
order_p_module.order_p_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
order_p_module.order_p_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({order_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('order_p_list_page_admin',{order_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({order_p:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('order_p_list_page_admin',{order_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.order_p_list_page_admin = order_p_list_page_admin


const order_p_list_admin = function (req,res) {
order_p_module.order_p_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({order_p : result1, err : err, session : req.session});
     } else {
     res.render('order_p_list_admin',{order_p : result1, err : err, session : req.session});
     }
  });
};



exports.order_p_list_admin = order_p_list_admin


const order_p_details = function (req,res) {
const id = req.params.id;
order_p_module.order_p_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({order_p : result1, err : err, session : req.session});
     } else {
     res.render('order_p_details',{order_p : result1, err : err, session : req.session});
     }
});
};



exports.order_p_details = order_p_details


const order_p_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'order_p',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     order_p_module.order_p_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({order_p : result1, err : err, session : req.session});
         } else {
         res.render('order_p_edit',{order_p : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.order_p_edit = order_p_edit


const order_p_edit_save = function (req,res) {
const id = req.params.id;
//let input = JSON.parse(JSON.stringify(req.body));
//let data_update = input
    const options = {
        multiples : true,
        uploadDir: './uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let input = fields;
        if (typeof input.user_id != 'undefined')  input.user_id = req.session.userid;

        let data_update =input;
      order_p_module.order_p_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./public/img/order_p/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./public/img/order_p/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             order_p_module.order_p_update(id,{order_p_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/order_p/admin/page/1');
     }
});
    })
};



exports.order_p_edit_save = order_p_edit_save


const order_p_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'order_p',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('order_p_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.order_p_add = order_p_add


const order_p_add_save = function (req,res) {
//let input = JSON.parse(JSON.stringify(req.body));
//let data_insert = input
    const options = {
        multiples : true,
        uploadDir: './uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let input = fields;
        if (typeof input.user_id != 'undefined')  input.user_id = req.session.userid;

        let data_insert =input;
order_p_module.order_p_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./public/img/order_p/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./public/img/order_p/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    order_p_module.order_p_update(result1.insertId,{order_p_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/order_p/admin/page/1');
     }
});
    })
};



exports.order_p_add_save = order_p_add_save


const order_p_delete = function (req,res) {
const id = req.params.id;
order_p_module.order_p_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/order_p/admin/page/1');
     }
});
};



exports.order_p_delete = order_p_delete


const order_p_filter = function (req,res) {
const filter = req.params.filter;
order_p_module.order_p_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({order_p : result1, err : err, session : req.session});
     } else {
     res.render('order_p_list_admin',{order_p : result1, err : err, session : req.session});
     }
});
};



exports.order_p_filter = order_p_filter


