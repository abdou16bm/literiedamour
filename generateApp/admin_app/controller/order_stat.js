const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const order_stat_module = require('../lib/order_stat');


const order_stat_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
order_stat_module.order_stat_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
order_stat_module.order_stat_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({order_stat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('order_stat_list_page',{order_stat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({order_stat:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('order_stat_list_page',{order_stat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.order_stat_list_page = order_stat_list_page


const order_stat_list = function (req,res) {
     order_stat_module.order_stat_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({order_stat : result1, err : err, session : req.session});
         } else {
         res.render('order_stat_list',{order_stat : result1, err : err, session : req.session});
         }
});
};



exports.order_stat_list = order_stat_list


const order_stat_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
order_stat_module.order_stat_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
order_stat_module.order_stat_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({order_stat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('order_stat_list_page_admin',{order_stat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({order_stat:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('order_stat_list_page_admin',{order_stat : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.order_stat_list_page_admin = order_stat_list_page_admin


const order_stat_list_admin = function (req,res) {
order_stat_module.order_stat_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({order_stat : result1, err : err, session : req.session});
     } else {
     res.render('order_stat_list_admin',{order_stat : result1, err : err, session : req.session});
     }
  });
};



exports.order_stat_list_admin = order_stat_list_admin


const order_stat_details = function (req,res) {
const id = req.params.id;
order_stat_module.order_stat_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({order_stat : result1, err : err, session : req.session});
     } else {
     res.render('order_stat_details',{order_stat : result1, err : err, session : req.session});
     }
});
};



exports.order_stat_details = order_stat_details


const order_stat_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'order_stat',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     order_stat_module.order_stat_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({order_stat : result1, err : err, session : req.session});
         } else {
         res.render('order_stat_edit',{order_stat : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.order_stat_edit = order_stat_edit


const order_stat_edit_save = function (req,res) {
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
      order_stat_module.order_stat_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./admin_app/public/img/order_stat/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./admin_app/public/img/order_stat/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             order_stat_module.order_stat_update(id,{order_stat_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/order_stat/admin/page/1');
     }
});
    })
};



exports.order_stat_edit_save = order_stat_edit_save


const order_stat_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'order_stat',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('order_stat_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.order_stat_add = order_stat_add


const order_stat_add_save = function (req,res) {
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
order_stat_module.order_stat_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./admin_app/public/img/order_stat/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./admin_app/public/img/order_stat/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    order_stat_module.order_stat_update(result1.insertId,{order_stat_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/order_stat/admin/page/1');
     }
});
    })
};



exports.order_stat_add_save = order_stat_add_save


const order_stat_delete = function (req,res) {
const id = req.params.id;
order_stat_module.order_stat_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/order_stat/admin/page/1');
     }
});
};



exports.order_stat_delete = order_stat_delete


const order_stat_filter = function (req,res) {
const filter = req.params.filter;
order_stat_module.order_stat_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({order_stat : result1, err : err, session : req.session});
     } else {
     res.render('order_stat_list_admin',{order_stat : result1, err : err, session : req.session});
     }
});
};



exports.order_stat_filter = order_stat_filter


