const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../lib/doc');
const { foreignDatas_GetAll } = require('../lib/default_lib');
const { db } = require('../lib/database');
const category_module = require('../lib/category');


const category_list_page = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    category_module.category_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            category_module.category_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('category_list_page',{category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({category:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('category_list_page',{category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.category_list_page = category_list_page


const category_list = function (req,res) {
    category_module.category_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({category : result1, err : err, session : req.session});
        } else {
            res.render('category_list',{category : result1, err : req.query.err, session : req.session});
        }
    });
};



exports.category_list = category_list


const category_list_page_admin = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    category_module.category_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            category_module.category_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('category_list_page_admin',{category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({category:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('category_list_page_admin',{category : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.category_list_page_admin = category_list_page_admin


const category_list_admin = function (req,res) {
    category_module.category_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({category : result1, err : err, session : req.session});
        } else {
            res.render('category_list_admin',{category : result1, err : req.querye.err, session : req.session});
        }
    });
};



exports.category_list_admin = category_list_admin


const category_details = function (req,res) {
    const id = req.params.id;
    category_module.category_get_one(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({category : result1, err : err, session : req.session});
        } else {
            res.render('category_details',{category : result1, err : err, session : req.session});
        }
    });
};



exports.category_details = category_details


const category_edit = function (req,res) {
    const id = req.params.id;
    category_module.category_get_one(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({category : result1, err : err, session : req.session});
        } else {
            res.render('category_edit',{category : result1, err : req.query.err, session : req.session});
        }
    });
};



exports.category_edit = category_edit


const category_edit_save = function (req,res) {
    const id = req.params.id;
    const options = {
        multiples : true,
        uploadDir: './uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let body = fields;

        if (typeof(body.cat_name) != 'undefined' && body.cat_name != null && body.cat_name != "") {

            let data_update = {

                cat_name : body.cat_name.trim()

            };

            category_module.category_update(id,data_update,function (err,result1) {

                if (err) console.log('error',err);
                doc_module.uploadFile('./public/img/category/',id,files,'main','main','jpg', function (err,count1){

                    if (err) console.log(err)
                    console.log('count1 : ',count1)

                    //category_module.category_update(id,{category_pic_count:count1})

                });

                if(req.baseUrl == "/api") {
                    res.send({update_result : result1, err : err, session : req.session});
                } else {
                    res.redirect('/category/list?err=0');
                }

            });

        } else {res.redirect('/category/'+id+'/edit?err=1');}

    })
};



exports.category_edit_save = category_edit_save


const category_add = function (req,res) {

    res.render('category_add',{err : req.query.err, session : req.session});
};



exports.category_add = category_add


const category_add_save = function (req,res) {

    const options = {
        multiples : true,
        uploadDir: './uploads'
    };

    var form = new formidable.IncomingForm(options);

    form.parse(req, function (err, fields, files) {

        let body = fields;

        if (typeof(body.cat_name) != 'undefined' && body.cat_name != null && body.cat_name != "") {

            let data_insert = {

                cat_name : body.cat_name.trim()

            };

            category_module.category_add(data_insert,function (err,result1) {

                if (err) console.log('error',err);
                doc_module.uploadFile('./public/img/category/',result1.insertId,files,'main','main','jpg', function (err,count1){

                    if (err) console.log(err)
                    console.log('count1 : ',count1)

                    //category_module.category_update(result1.insertId,{category_pic_count:count1})

                });

                if(req.baseUrl == "/api") {
                    res.send({insert_result : result1, err : err, session : req.session});
                } else {
                    res.redirect('/category/list?err=0');
                }

            });

        } else {res.redirect('/category/add?err=1');}

    })
};



exports.category_add_save = category_add_save


const category_delete = function (req,res) {
    const id = req.params.id;
    category_module.category_delete(id,function (err,result1) {

        if (err) {

            console.log('error',err)
            res.redirect("/category/list?err=1")

        } else {

            if(req.baseUrl == "/api") {
                res.send({delete_result : result1, err : req.query.err, session : req.session});
            } else {
                res.redirect('/category/list?err=0');
            }

        }

});
};



exports.category_delete = category_delete


const category_filter = function (req,res) {
    const filter = req.params.filter;
    category_module.category_filter(filter,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({category : result1, err : err, session : req.session});
        } else {
            res.render('category_list_admin',{category : result1, err : err, session : req.session});
        }
    });
};



exports.category_filter = category_filter


