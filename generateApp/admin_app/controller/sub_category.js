const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../lib/doc');
const { foreignDatas_GetAll } = require('../lib/default_lib');
const { db } = require('../lib/database');
const sub_category_module = require('../lib/sub_category');


const sub_category_list_page = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    sub_category_module.sub_category_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            sub_category_module.sub_category_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({sub_category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('sub_category_list_page',{sub_category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({sub_category:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('sub_category_list_page',{sub_category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.sub_category_list_page = sub_category_list_page


const sub_category_list = function (req,res) {
    sub_category_module.sub_category_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({sub_category : result1, err : err, session : req.session});
        } else {
            res.render('sub_category_list',{sub_category : result1, err : req.query.err, session : req.session});
        }
    });
};



exports.sub_category_list = sub_category_list


const sub_category_list_page_admin = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    sub_category_module.sub_category_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            sub_category_module.sub_category_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({sub_category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('sub_category_list_page_admin',{sub_category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({sub_category:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('sub_category_list_page_admin',{sub_category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.sub_category_list_page_admin = sub_category_list_page_admin


const sub_category_list_admin = function (req,res) {
    sub_category_module.sub_category_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({sub_category : result1, err : err, session : req.session});
        } else {
            res.render('sub_category_list_admin',{sub_category : result1, err : req.querye.err, session : req.session});
        }
    });
};



exports.sub_category_list_admin = sub_category_list_admin


const sub_category_details = function (req,res) {
    const id = req.params.id;
    sub_category_module.sub_category_get_one(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({sub_category : result1, err : err, session : req.session});
        } else {
            res.render('sub_category_details',{sub_category : result1, err : err, session : req.session});
        }
    });
};



exports.sub_category_details = sub_category_details


const sub_category_edit = function (req,res) {
    const id = req.params.id;
    sub_category_module.sub_category_get_one(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({sub_category : result1, err : err, session : req.session});
        } else {
            res.render('sub_category_edit',{sub_category : result1, err : req.query.err, session : req.session});
        }
    });
};



exports.sub_category_edit = sub_category_edit


const sub_category_edit_save = function (req,res) {
    const id = req.params.id;
    const options = {
        multiples : true,
        uploadDir: './uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let body = fields;

        if (typeof(body.sub_cat_name) != 'undefined' && body.sub_cat_name != null && body.sub_cat_name != "") {

            let data_update = {

                sub_cat_name : body.sub_cat_name.trim()

            };

            sub_category_module.sub_category_update(id,data_update,function (err,result1) {

                if (err) console.log('error',err);
                doc_module.uploadFile('./public/img/sub_category/',id,files,'main','main','jpg', function (err,count1){

                    if (err) console.log(err)
                    console.log('count1 : ',count1)

                    //sub_category_module.sub_category_update(id,{sub_category_pic_count:count1})

                });

                if(req.baseUrl == "/api") {
                    res.send({update_result : result1, err : err, session : req.session});
                } else {
                    res.redirect('/sub_category/list?err=0');
                }

            });

        } else {res.redirect('/sub_category/'+id+'/edit?err=1');}

    })
};



exports.sub_category_edit_save = sub_category_edit_save


const sub_category_add = function (req,res) {

    res.render('sub_category_add',{err : req.query.err, session : req.session});
};



exports.sub_category_add = sub_category_add


const sub_category_add_save = function (req,res) {

    const options = {
        multiples : true,
        uploadDir: './uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let body = fields;

        if (typeof(body.sub_cat_name) != 'undefined' && body.sub_cat_name != null && body.sub_cat_name != "") {

            let data_insert = {

                sub_cat_name : body.sub_cat_name.trim(),
                cat_id : 1

            };

            sub_category_module.sub_category_add(data_insert,function (err,result1) {

                if (err) console.log('error',err);
                doc_module.uploadFile('./public/img/sub_category/',result1.insertId,files,'main','main','jpg', function (err,count1){

                    if (err) console.log(err)
                    console.log('count1 : ',count1)

                    //sub_category_module.sub_category_update(result1.insertId,{sub_category_pic_count:count1})

                });

                if(req.baseUrl == "/api") {
                    res.send({insert_result : result1, err : err, session : req.session});
                } else {
                    res.redirect('/sub_category/list?err=0');
                }

            });

        } else {res.redirect('/sub_category/add?err=1');}

    })
};



exports.sub_category_add_save = sub_category_add_save


const sub_category_delete = function (req,res) {
    const id = req.params.id;
    sub_category_module.sub_category_delete(id,function (err,result1) {

        if (err) {

            console.log('error',err)
            res.redirect("/sub_category/list?err=1")

        } else {

            if(req.baseUrl == "/api") {
                res.send({delete_result : result1, err : req.query.err, session : req.session});
            } else {
                res.redirect('/sub_category/list?err=0');
            }

        }

});
};



exports.sub_category_delete = sub_category_delete


const sub_category_filter = function (req,res) {
    const filter = req.params.filter;
    sub_category_module.sub_category_filter(filter,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({sub_category : result1, err : err, session : req.session});
        } else {
            res.render('sub_category_list_admin',{sub_category : result1, err : err, session : req.session});
        }
    });
};



exports.sub_category_filter = sub_category_filter


