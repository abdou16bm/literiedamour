const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const property_p_module = require('../lib/property_p');


const property_p_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
property_p_module.property_p_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
property_p_module.property_p_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({property_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('property_p_list_page',{property_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({property_p:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('property_p_list_page',{property_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.property_p_list_page = property_p_list_page


const property_p_list = function (req,res) {
     property_p_module.property_p_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({property_p : result1, err : err, session : req.session});
         } else {
         res.render('property_p_list',{property_p : result1, err : err, session : req.session});
         }
});
};



exports.property_p_list = property_p_list


const property_p_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
property_p_module.property_p_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
property_p_module.property_p_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({property_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('property_p_list_page_admin',{property_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({property_p:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('property_p_list_page_admin',{property_p : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.property_p_list_page_admin = property_p_list_page_admin


const property_p_list_admin = function (req,res) {
property_p_module.property_p_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({property_p : result1, err : err, session : req.session});
     } else {
     res.render('property_p_list_admin',{property_p : result1, err : err, session : req.session});
     }
  });
};



exports.property_p_list_admin = property_p_list_admin


const property_p_details = function (req,res) {
const id = req.params.id;
property_p_module.property_p_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({property_p : result1, err : err, session : req.session});
     } else {
     res.render('property_p_details',{property_p : result1, err : err, session : req.session});
     }
});
};



exports.property_p_details = property_p_details


const property_p_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'property_p',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     property_p_module.property_p_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({property_p : result1, err : err, session : req.session});
         } else {
         res.render('property_p_edit',{property_p : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.property_p_edit = property_p_edit


const property_p_edit_save = function (req,res) {
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
      property_p_module.property_p_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./public/img/property_p/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./public/img/property_p/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             property_p_module.property_p_update(id,{property_p_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/property_p/admin/page/1');
     }
});
    })
};



exports.property_p_edit_save = property_p_edit_save


const property_p_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'property_p',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('property_p_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.property_p_add = property_p_add


const property_p_add_save = function (req,res) {
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
property_p_module.property_p_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./public/img/property_p/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./public/img/property_p/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    property_p_module.property_p_update(result1.insertId,{property_p_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/property_p/admin/page/1');
     }
});
    })
};



exports.property_p_add_save = property_p_add_save


const property_p_delete = function (req,res) {
const id = req.params.id;
property_p_module.property_p_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/property_p/admin/page/1');
     }
});
};



exports.property_p_delete = property_p_delete


const property_p_filter = function (req,res) {
const filter = req.params.filter;
property_p_module.property_p_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({property_p : result1, err : err, session : req.session});
     } else {
     res.render('property_p_list_admin',{property_p : result1, err : err, session : req.session});
     }
});
};



exports.property_p_filter = property_p_filter


