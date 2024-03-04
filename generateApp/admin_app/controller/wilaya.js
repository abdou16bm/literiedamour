const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const wilaya_module = require('../lib/wilaya');


const wilaya_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
wilaya_module.wilaya_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
wilaya_module.wilaya_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({wilaya : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('wilaya_list_page',{wilaya : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({wilaya:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('wilaya_list_page',{wilaya : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.wilaya_list_page = wilaya_list_page


const wilaya_list = function (req,res) {
     wilaya_module.wilaya_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({wilaya : result1, err : err, session : req.session});
         } else {
         res.render('wilaya_list',{wilaya : result1, err : err, session : req.session});
         }
});
};



exports.wilaya_list = wilaya_list


const wilaya_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
wilaya_module.wilaya_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
wilaya_module.wilaya_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({wilaya : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('wilaya_list_page_admin',{wilaya : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({wilaya:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('wilaya_list_page_admin',{wilaya : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.wilaya_list_page_admin = wilaya_list_page_admin


const wilaya_list_admin = function (req,res) {
wilaya_module.wilaya_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({wilaya : result1, err : err, session : req.session});
     } else {
     res.render('wilaya_list_admin',{wilaya : result1, err : err, session : req.session});
     }
  });
};



exports.wilaya_list_admin = wilaya_list_admin


const wilaya_details = function (req,res) {
const id = req.params.id;
wilaya_module.wilaya_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({wilaya : result1, err : err, session : req.session});
     } else {
     res.render('wilaya_details',{wilaya : result1, err : err, session : req.session});
     }
});
};



exports.wilaya_details = wilaya_details


const wilaya_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'wilaya',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     wilaya_module.wilaya_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({wilaya : result1, err : err, session : req.session});
         } else {
         res.render('wilaya_edit',{wilaya : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.wilaya_edit = wilaya_edit


const wilaya_edit_save = function (req,res) {
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
      wilaya_module.wilaya_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./public/img/wilaya/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./public/img/wilaya/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             wilaya_module.wilaya_update(id,{wilaya_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/wilaya/admin/page/1');
     }
});
    })
};



exports.wilaya_edit_save = wilaya_edit_save


const wilaya_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'wilaya',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('wilaya_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.wilaya_add = wilaya_add


const wilaya_add_save = function (req,res) {
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
wilaya_module.wilaya_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./public/img/wilaya/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./public/img/wilaya/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    wilaya_module.wilaya_update(result1.insertId,{wilaya_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/wilaya/admin/page/1');
     }
});
    })
};



exports.wilaya_add_save = wilaya_add_save


const wilaya_delete = function (req,res) {
const id = req.params.id;
wilaya_module.wilaya_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/wilaya/admin/page/1');
     }
});
};



exports.wilaya_delete = wilaya_delete


const wilaya_filter = function (req,res) {
const filter = req.params.filter;
wilaya_module.wilaya_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({wilaya : result1, err : err, session : req.session});
     } else {
     res.render('wilaya_list_admin',{wilaya : result1, err : err, session : req.session});
     }
});
};



exports.wilaya_filter = wilaya_filter


