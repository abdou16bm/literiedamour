const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const cart_p_module = require('../lib/cart_p');


const cart_p_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
cart_p_module.cart_p_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
cart_p_module.cart_p_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({cart_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('cart_p_list_page',{cart_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({cart_p:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('cart_p_list_page',{cart_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.cart_p_list_page = cart_p_list_page


const cart_p_list = function (req,res) {
     cart_p_module.cart_p_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({cart_p : result1, err : err, session : req.session});
         } else {
         res.render('cart_p_list',{cart_p : result1, err : err, session : req.session});
         }
});
};



exports.cart_p_list = cart_p_list


const cart_p_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
cart_p_module.cart_p_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
cart_p_module.cart_p_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({cart_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('cart_p_list_page_admin',{cart_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({cart_p:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('cart_p_list_page_admin',{cart_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.cart_p_list_page_admin = cart_p_list_page_admin


const cart_p_list_admin = function (req,res) {
cart_p_module.cart_p_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({cart_p : result1, err : err, session : req.session});
     } else {
     res.render('cart_p_list_admin',{cart_p : result1, err : err, session : req.session});
     }
  });
};



exports.cart_p_list_admin = cart_p_list_admin


const cart_p_details = function (req,res) {
const id = req.params.id;
cart_p_module.cart_p_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({cart_p : result1, err : err, session : req.session});
     } else {
     res.render('cart_p_details',{cart_p : result1, err : err, session : req.session});
     }
});
};



exports.cart_p_details = cart_p_details


const cart_p_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'cart_p',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     cart_p_module.cart_p_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({cart_p : result1, err : err, session : req.session});
         } else {
         res.render('cart_p_edit',{cart_p : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.cart_p_edit = cart_p_edit


const cart_p_edit_save = function (req,res) {
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
      cart_p_module.cart_p_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./admin_app/public/img/cart_p/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./admin_app/public/img/cart_p/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             cart_p_module.cart_p_update(id,{cart_p_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/cart_p/admin/page/1');
     }
});
    })
};



exports.cart_p_edit_save = cart_p_edit_save


const cart_p_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'cart_p',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('cart_p_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.cart_p_add = cart_p_add


const cart_p_add_save = function (req,res) {
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
cart_p_module.cart_p_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./admin_app/public/img/cart_p/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./admin_app/public/img/cart_p/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    cart_p_module.cart_p_update(result1.insertId,{cart_p_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/cart_p/admin/page/1');
     }
});
    })
};



exports.cart_p_add_save = cart_p_add_save


const cart_p_delete = function (req,res) {
const id = req.params.id;
cart_p_module.cart_p_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/cart_p/admin/page/1');
     }
});
};



exports.cart_p_delete = cart_p_delete


const cart_p_filter = function (req,res) {
const filter = req.params.filter;
cart_p_module.cart_p_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({cart_p : result1, err : err, session : req.session});
     } else {
     res.render('cart_p_list_admin',{cart_p : result1, err : err, session : req.session});
     }
});
};



exports.cart_p_filter = cart_p_filter


