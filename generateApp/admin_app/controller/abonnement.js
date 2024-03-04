const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const abonnement_module = require('../lib/abonnement');


const abonnement_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
abonnement_module.abonnement_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
abonnement_module.abonnement_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({abonnement : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('abonnement_list_page',{abonnement : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({abonnement:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('abonnement_list_page',{abonnement : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.abonnement_list_page = abonnement_list_page


const abonnement_list = function (req,res) {
     abonnement_module.abonnement_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({abonnement : result1, err : err, session : req.session});
         } else {
         res.render('abonnement_list',{abonnement : result1, err : err, session : req.session});
         }
});
};



exports.abonnement_list = abonnement_list


const abonnement_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
abonnement_module.abonnement_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
abonnement_module.abonnement_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({abonnement : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('abonnement_list_page_admin',{abonnement : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({abonnement:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('abonnement_list_page_admin',{abonnement : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.abonnement_list_page_admin = abonnement_list_page_admin


const abonnement_list_admin = function (req,res) {
abonnement_module.abonnement_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({abonnement : result1, err : err, session : req.session});
     } else {
     res.render('abonnement_list_admin',{abonnement : result1, err : err, session : req.session});
     }
  });
};



exports.abonnement_list_admin = abonnement_list_admin


const abonnement_details = function (req,res) {
const id = req.params.id;
abonnement_module.abonnement_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({abonnement : result1, err : err, session : req.session});
     } else {
     res.render('abonnement_details',{abonnement : result1, err : err, session : req.session});
     }
});
};



exports.abonnement_details = abonnement_details


const abonnement_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'abonnement',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     abonnement_module.abonnement_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({abonnement : result1, err : err, session : req.session});
         } else {
         res.render('abonnement_edit',{abonnement : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.abonnement_edit = abonnement_edit


const abonnement_edit_save = function (req,res) {
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
      abonnement_module.abonnement_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./public/img/abonnement/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./public/img/abonnement/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             abonnement_module.abonnement_update(id,{abonnement_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/abonnement/admin/page/1');
     }
});
    })
};



exports.abonnement_edit_save = abonnement_edit_save


const abonnement_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'abonnement',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('abonnement_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.abonnement_add = abonnement_add


const abonnement_add_save = function (req,res) {
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
abonnement_module.abonnement_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./public/img/abonnement/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./public/img/abonnement/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    abonnement_module.abonnement_update(result1.insertId,{abonnement_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/abonnement/admin/page/1');
     }
});
    })
};



exports.abonnement_add_save = abonnement_add_save


const abonnement_delete = function (req,res) {
const id = req.params.id;
abonnement_module.abonnement_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/abonnement/admin/page/1');
     }
});
};



exports.abonnement_delete = abonnement_delete


const abonnement_filter = function (req,res) {
const filter = req.params.filter;
abonnement_module.abonnement_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({abonnement : result1, err : err, session : req.session});
     } else {
     res.render('abonnement_list_admin',{abonnement : result1, err : err, session : req.session});
     }
});
};



exports.abonnement_filter = abonnement_filter


