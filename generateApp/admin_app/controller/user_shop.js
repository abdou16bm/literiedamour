const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const user_shop_module = require('../lib/user_shop');


const user_shop_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
user_shop_module.user_shop_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
user_shop_module.user_shop_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({user_shop : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('user_shop_list_page',{user_shop : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({user_shop:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('user_shop_list_page',{user_shop : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.user_shop_list_page = user_shop_list_page


const user_shop_list = function (req,res) {
     user_shop_module.user_shop_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({user_shop : result1, err : err, session : req.session});
         } else {
         res.render('user_shop_list',{user_shop : result1, err : err, session : req.session});
         }
});
};



exports.user_shop_list = user_shop_list


const user_shop_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
user_shop_module.user_shop_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
user_shop_module.user_shop_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({user_shop : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('user_shop_list_page_admin',{user_shop : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({user_shop:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('user_shop_list_page_admin',{user_shop : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.user_shop_list_page_admin = user_shop_list_page_admin


const user_shop_list_admin = function (req,res) {
user_shop_module.user_shop_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({user_shop : result1, err : err, session : req.session});
     } else {
     res.render('user_shop_list_admin',{user_shop : result1, err : err, session : req.session});
     }
  });
};



exports.user_shop_list_admin = user_shop_list_admin


const user_shop_details = function (req,res) {
const id = req.params.id;
user_shop_module.user_shop_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({user_shop : result1, err : err, session : req.session});
     } else {
     res.render('user_shop_details',{user_shop : result1, err : err, session : req.session});
     }
});
};



exports.user_shop_details = user_shop_details


const user_shop_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'user_shop',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     user_shop_module.user_shop_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({user_shop : result1, err : err, session : req.session});
         } else {
         res.render('user_shop_edit',{user_shop : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.user_shop_edit = user_shop_edit


const user_shop_edit_save = function (req,res) {
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
      user_shop_module.user_shop_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./public/img/user_shop/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./public/img/user_shop/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             user_shop_module.user_shop_update(id,{user_shop_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/user_shop/admin/page/1');
     }
});
    })
};



exports.user_shop_edit_save = user_shop_edit_save


const user_shop_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'user_shop',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('user_shop_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.user_shop_add = user_shop_add


const user_shop_add_save = function (req,res) {
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
user_shop_module.user_shop_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./public/img/user_shop/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./public/img/user_shop/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    user_shop_module.user_shop_update(result1.insertId,{user_shop_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/user_shop/admin/page/1');
     }
});
    })
};



exports.user_shop_add_save = user_shop_add_save


const user_shop_delete = function (req,res) {
const id = req.params.id;
user_shop_module.user_shop_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/user_shop/admin/page/1');
     }
});
};



exports.user_shop_delete = user_shop_delete


const user_shop_filter = function (req,res) {
const filter = req.params.filter;
user_shop_module.user_shop_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({user_shop : result1, err : err, session : req.session});
     } else {
     res.render('user_shop_list_admin',{user_shop : result1, err : err, session : req.session});
     }
});
};



exports.user_shop_filter = user_shop_filter


