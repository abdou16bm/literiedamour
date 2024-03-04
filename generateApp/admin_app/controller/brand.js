const formidable = require('formidable');
 const fs = require('fs');
 const doc_module = require('../lib/doc');
 const { foreignDatas_GetAll } = require('../lib/default_lib');
 const { db } = require('../lib/database');
 const brand_module = require('../lib/brand');


const brand_list_page = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
brand_module.brand_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
brand_module.brand_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({brand : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('brand_list_page',{brand : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({brand:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('brand_list_page',{brand : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.brand_list_page = brand_list_page


const brand_list = function (req,res) {

     brand_module.brand_get_all(function (err,result1) {
         if (err) console.log('error',err);
         if(req.baseUrl == "/api") {
         res.send({brands : result1, err : req.query.err, session : req.session});
         } else {
         res.render('brands_list',{brands : result1, err : req.query.err, session : req.session});
         }
     });
};



exports.brand_list = brand_list


const brand_list_page_admin = function (req,res) {
let count_page = 0;
let limit_page = 9;
let current_page = req.params.page-1;
brand_module.brand_count_page(limit_page,function (err,result1) {
 if (err) console.log('err : ',err) ;
if (result1.length)
{
if (result1[0].count_p > 0) count_page = result1[0].count_p;
brand_module.brand_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
res.send({brand : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     } else {
res.render('brand_list_page_admin',{brand : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
})
}
else {
     if(req.baseUrl == "/api") {
res.send({brand:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
     } else {
res.render('brand_list_page_admin',{brand : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
     }
}
})
};



exports.brand_list_page_admin = brand_list_page_admin


const brand_list_admin = function (req,res) {
brand_module.brand_get_all(function (err,result1) {
     if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({brand : result1, err : err, session : req.session});
     } else {
     res.render('brand_list_admin',{brand : result1, err : err, session : req.session});
     }
  });
};



exports.brand_list_admin = brand_list_admin


const brand_details = function (req,res) {
const id = req.params.id;
brand_module.brand_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({brand : result1, err : err, session : req.session});
     } else {
     res.render('brand_details',{brand : result1, err : err, session : req.session});
     }
});
};



exports.brand_details = brand_details


const brand_edit = function (req,res) {
const id = req.params.id;
brand_module.brand_get_one(id,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({brand : result1, err : req.query.err, session : req.session});
     } else {
     res.render('brand_edit',{brand : result1, err : req.query.err, session : req.session});
     }
});
};



exports.brand_edit = brand_edit


const brand_edit_save = function (req,res) {
     const id = req.params.id;
         const options = {
             multiples : true,
             uploadDir: './uploads'
         };

         var form = new formidable.IncomingForm(options);

          form.parse(req, function (err, fields, files) {

               let body = fields;

               if (body.brand_name != undefined && body.brand_name != null && body.brand_name != "") {

                    let data_update = {

                         brand_name : body.brand_name.trim()

                    };

                    brand_module.brand_update(id,data_update,function (err,result1) {

                         if (err) console.log('error',err);
                         doc_module.uploadFile('./public/img/brand/',id,files,'main','main','jpg', function (err,count1){

                              if (err) console.log(err)
                              console.log('count1 : ',count1)

                              //brand_module.brand_update(id,{brand_pic:count1})

                         });

                         if(req.baseUrl == "/api") {
                         res.send({update_result : result1, err : err, session : req.session});
                         } else {
                         res.redirect('/brands/list?err=0');
                         }

                    });

               } else {res.redirect('/brand/'+id+'/edit?err=1');}

          })
     };



exports.brand_edit_save = brand_edit_save


const brand_add = function (req,res) {

     res.render('brand_add',{err : req.query.err, session : req.session});

};



exports.brand_add = brand_add


const brand_add_save = function (req,res) {

     const options = {
         multiples : true,
         uploadDir: './uploads'
     };

     var form = new formidable.IncomingForm(options);

      form.parse(req, function (err, fields, files) {

           let body = fields;

           if (body.brand_name != undefined && body.brand_name != null && body.brand_name != "") {

                let data_insert = {

                    brand_name : body.brand_name.trim()

                };

                brand_module.brand_add(data_insert,function (err,result1) {

                     if (err) console.log('error',err);
                     doc_module.uploadFile('./public/img/brand/',result1.insertId,files,'main','main','jpg', function (err,count1){

                          if (err) console.log(err)
                          console.log('count1 : ',count1)

                          //brand_module.brand_update(result1.insertId,{brand_pic:count1})

                     });

                     if(req.baseUrl == "/api") {
                     res.send({insert_result : result1, err : err, session : req.session});
                     } else {
                     res.redirect('/brands/list?err=0');
                     }

                });

           } else {res.redirect('/brand/add?err=1');}

      })
};




exports.brand_add_save = brand_add_save


const brand_delete = function (req,res) {
const id = req.params.id;
brand_module.brand_delete(id,function (err,result1) {

     if (err) {

          console.log('error',err)
          res.redirect("/brands/list?err=1")

     } else {


          if(req.baseUrl == "/api") {
          res.send({delete_result : result1, err : err, session : req.session});
          } else {
          res.redirect('/brands/list?err=0');
          }

     }

});
};



exports.brand_delete = brand_delete


const brand_filter = function (req,res) {
const filter = req.params.filter;
brand_module.brand_filter(filter,function (err,result1) {
if (err) console.log('error',err);
     if(req.baseUrl == "/api") {
     res.send({brand : result1, err : err, session : req.session});
     } else {
     res.render('brand_list_admin',{brand : result1, err : err, session : req.session});
     }
});
};



exports.brand_filter = brand_filter


