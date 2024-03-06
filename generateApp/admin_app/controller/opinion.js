const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const opinion_module = require('../lib/opinion');


const opinion_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
opinion_module.opinion_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
opinion_module.opinion_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({opinion : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('opinion_list_page',{opinion : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({opinion:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('opinion_list_page',{opinion : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.opinion_list_page = opinion_list_page


const opinion_list = function (req,res) {
     opinion_module.opinion_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({opinion : result1, err : err, session : req.session});
         } else {
         res.render('opinion_list',{opinion : result1, err : err, session : req.session});
         }
});
};



exports.opinion_list = opinion_list


const opinion_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
opinion_module.opinion_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
opinion_module.opinion_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({opinion : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('opinion_list_page_admin',{opinion : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({opinion:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('opinion_list_page_admin',{opinion : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.opinion_list_page_admin = opinion_list_page_admin


const opinion_list_admin = function (req,res) {
opinion_module.opinion_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({opinion : result1, err : err, session : req.session});
     } else {
     res.render('opinion_list_admin',{opinion : result1, err : err, session : req.session});
     }
  });
};



exports.opinion_list_admin = opinion_list_admin


const opinion_details = function (req,res) {
const id = req.params.id;
opinion_module.opinion_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({opinion : result1, err : err, session : req.session});
     } else {
     res.render('opinion_details',{opinion : result1, err : err, session : req.session});
     }
});
};



exports.opinion_details = opinion_details


const opinion_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'opinion',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     opinion_module.opinion_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({opinion : result1, err : err, session : req.session});
         } else {
         res.render('opinion_edit',{opinion : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.opinion_edit = opinion_edit


const opinion_edit_save = function (req,res) {
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
      opinion_module.opinion_update(id,data_update,function (err,result1) {
      if (err) console.log('error',err);
        doc_module.uploadFile('./public/img/opinion/',id,files,'main','main','jpg', function (err,count1){

        if (err) console.log(err)

        console.log('count1 : ',count1)
         doc_module.uploadMultiFile('./public/img/opinion/',id,files,'jpg', function (err,count2){

             if (err) console.log(err)

             console.log('count2 : ',count2)

             opinion_module.opinion_update(id,{opinion_pic_count:count2})

         })
      })
     if(req.baseUrl == "/api") {
     res.send({update_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/opinion/admin/page/1');
     }
});
    })
};



exports.opinion_edit_save = opinion_edit_save


const opinion_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'opinion',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('opinion_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.opinion_add = opinion_add


const opinion_add_save = function (req,res) {
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
opinion_module.opinion_add(data_insert,function (err,result1) {
if (err) console.log('error',err);
           doc_module.uploadFile('./public/img/opinion/',result1.insertId,files,'main','main','jpg', function (err,count1){

           if (err) console.log(err)

            console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./public/img/opinion/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    opinion_module.opinion_update(result1.insertId,{opinion_pic_count:count2})

                });             });
     if(req.baseUrl == "/api") {
     res.send({insert_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/opinion/admin/page/1');
     }
});
    })
};



exports.opinion_add_save = opinion_add_save


const opinion_delete = function (req,res) {
const id = req.params.id;
opinion_module.opinion_delete(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({delete_result : result1, err : err, session : req.session});
     } else {
     res.redirect('/opinion/admin/page/1');
     }
});
};



exports.opinion_delete = opinion_delete


const opinion_filter = function (req,res) {
const filter = req.params.filter;
opinion_module.opinion_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({opinion : result1, err : err, session : req.session});
     } else {
     res.render('opinion_list_admin',{opinion : result1, err : err, session : req.session});
     }
});
};



exports.opinion_filter = opinion_filter


