const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const details_module = require('../lib/details');
 const sub_cateogry_module = require('../lib/sub_category');


const details_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
details_module.details_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
details_module.details_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('details_list_page',{details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({details:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('details_list_page',{details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.details_list_page = details_list_page


const details_list = function (req,res) {
     
     const sub_cat = req.query.cat

     sub_cateogry_module.sub_category_get_one(sub_cat,function (err,result) {

          if (err) console.log('error',err);

          if (result.length > 0) {

               details_module.details_get_all_sub_category(result[0].sub_cat_id,function (err,result1) {
         
                    if (err) console.log('error',err);
                    if(req.baseUrl == "/api") {
                    res.send({details : result1, sub_category : result, err : req.query.err, session : req.session});
                    } else {
                    res.render('details_list',{details : result1, sub_category : result, err : req.query.err, session : req.session});
                    }
            
               });
               
          } else {

               if(req.baseUrl == "/api") {
               res.send({details : [], sub_category : [], err : req.query.err, session : req.session});
               } else {
               res.render('details_list',{details : [], sub_category : [], err : req.query.err, session : req.session});
               }

          }

     })

};



exports.details_list = details_list


const details_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
details_module.details_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
details_module.details_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('details_list_page_admin',{details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({details:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('details_list_page_admin',{details : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.details_list_page_admin = details_list_page_admin


const details_list_admin = function (req,res) {
details_module.details_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({details : result1, err : err, session : req.session});
     } else {
     res.render('details_list_admin',{details : result1, err : err, session : req.session});
     }
  });
};



exports.details_list_admin = details_list_admin


const details_details = function (req,res) {
const id = req.params.id;
details_module.details_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({details : result1, err : err, session : req.session});
     } else {
     res.render('details_details',{details : result1, err : err, session : req.session});
     }
});
};



exports.details_details = details_details


const details_edit = function (req,res) {
const id = req.params.id;
 foreignDatas_GetAll(db,db.config.database,'details',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
     details_module.details_get_one(id,function (err,result1) {
     if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({details : result1, err : err, session : req.session});
         } else {
         res.render('details_edit',{details : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
         }
     });
});
};



exports.details_edit = details_edit


const details_edit_save = function (req,res) {
const id = req.params.id;
const options = {
     multiples : true,
     uploadDir: './admin_app/uploads'
};

var form = new formidable.IncomingForm(options);

form.parse(req, function (err, fields, files) {

     let body = fields;

     //console.log(body)

     if (body.detail_name != undefined && body.detail_name != null && body.detail_name != "") {

          let data_update = {

               detail_name : body.detail_name.trim()

          };
          
          details_module.details_update(id,data_update,function (err,result1) {
               
               if (err) console.log('error',err)

               if(req.baseUrl == "/api") {
               res.send({insert_result : result1, err : err, session : req.session});
               } else {
               res.redirect("/details/list?cat="+body.sub_cat+"&err=0")
               }
                         
          });

     } else {res.redirect("/details/list?cat="+body.sub_cat+"&err=2")}

})
};



exports.details_edit_save = details_edit_save


const details_add = function (req,res) {
 foreignDatas_GetAll(db,db.config.database,'details',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
    if (err) console.log('err', err)
         res.render('details_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
     });
};



exports.details_add = details_add


const details_add_save = function (req,res) {
     const options = {
          multiples : true,
          uploadDir: './admin_app/uploads'
     };
  
     var form = new formidable.IncomingForm(options);
  
     form.parse(req, function (err, fields, files) {
  
          let body = fields;

          //console.log(body)
  
          if (body.detail_name != undefined && body.detail_name != null && body.detail_name != "") {

               let data_insert = {

                    detail_name : body.detail_name.trim(),
                    sub_cat_id : body.sub_cat

               };
               
               details_module.details_add(data_insert,function (err,result1) {
                    
                    if (err) console.log('error',err)

                    if(req.baseUrl == "/api") {
                    res.send({insert_result : result1, err : err, session : req.session});
                    } else {
                    res.redirect("/details/list?cat="+body.sub_cat+"&err=0")
                    }
                              
               });
  
          } else {res.redirect("/details/list?cat="+body.sub_cat+"&err=2")}
     
     })
};



exports.details_add_save = details_add_save


const details_delete = function (req,res) {
const id = req.params.id;

     details_module.details_get_one(id,function (err,result) {

          if (err) console.log('error',err)

          let sub_cat_id = result[0].sub_cat_id

          details_module.details_delete(id,function (err,result1) {
     
               if (err) {
          
                    console.log('error',err)
                    res.redirect("/details/list?cat="+sub_cat_id+"&err=1")
               
               } else {
          
                    if(req.baseUrl == "/api") {
                    res.send({delete_result : result1, err : err, session : req.session});
                    } else {
                    res.redirect('/details/list?cat='+sub_cat_id+"&err=0");
                    }
          
               }
          
          
          });
          
     })

};



exports.details_delete = details_delete


const details_filter = function (req,res) {
const filter = req.params.filter;
details_module.details_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({details : result1, err : err, session : req.session});
     } else {
     res.render('details_list_admin',{details : result1, err : err, session : req.session});
     }
});
};



exports.details_filter = details_filter


