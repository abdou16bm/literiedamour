const formidable = require('formidable');
const fs = require('fs');
const doc_module = require('../lib/doc');
const { foreignDatas_GetAll } = require('../lib/default_lib');
const { db } = require('../lib/database');
const user_module = require('../lib/user');


const user_list_page = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    user_module.user_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            user_module.user_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({user : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('user_list_page',{user : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({user:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('user_list_page',{user : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.user_list_page = user_list_page


const user_list = function (req,res) {
    user_module.user_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({user : result1, err : err, session : req.session});
        } else {
            res.render('user_list',{user : result1, err : err, session : req.session});
        }
    });
};



exports.user_list = user_list


const user_list_page_admin = function (req,res) {
    let count_page = 0;
    let limit_page = 9;
    let current_page = req.params.page-1;
    user_module.user_count_page(limit_page,function (err,result1) {
        if (err) console.log('err : ',err) ;
        if (result1.length)
        {
            if (result1[0].count_p > 0) count_page = result1[0].count_p;
            user_module.user_get_all_limit(current_page*limit_page,limit_page,'table_pk','DESC',function (err,result2) {
                if (err) console.log('error',err);
                if(req.baseUrl == "/api") {
                    res.send({user : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                } else {
                    res.render('user_list_page_admin',{user : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
                }
            })
        }
        else {
            if(req.baseUrl == "/api") {
                res.send({user:[],info:{count_page : 0, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session})
            } else {
                res.render('user_list_page_admin',{user : result2,info:{count_page : count_page, limit_page:limit_page, current_page : parseInt(current_page)+1}, err : err, session : req.session});
            }
        }
    })
};



exports.user_list_page_admin = user_list_page_admin


const user_list_admin = function (req,res) {
    user_module.user_get_all(function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({user : result1, err : err, session : req.session});
        } else {
            res.render('user_list_admin',{user : result1, err : err, session : req.session});
        }
    });
};



exports.user_list_admin = user_list_admin


const user_details = function (req,res) {
    const id = req.params.id;
    user_module.user_get_one(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({user : result1, err : err, session : req.session});
        } else {
            res.render('user_details',{user : result1, err : err, session : req.session});
        }
    });
};



exports.user_details = user_details


const user_edit = function (req,res) {
    const id = req.params.id;
    foreignDatas_GetAll(db,db.config.database,'user',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
        if (err) console.log('err', err)
        user_module.user_get_one(id,function (err,result1) {
            if (err) console.log('error',err);
            if(req.baseUrl == "/api") {
                res.send({user : result1, err : err, session : req.session});
            } else {
                res.render('user_edit',{user : result1, foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
            }
        });
    });
};



exports.user_edit = user_edit


const user_edit_save = function (req,res) {
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
        user_module.user_update(id,data_update,function (err,result1) {
            if (err) console.log('error',err);
            doc_module.uploadFile('./public/img/user/',id,files,'main','main','jpg', function (err,count1){

                if (err) console.log(err)

                console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./public/img/user/',id,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    user_module.user_update(id,{user_pic_count:count2})

                })
            })
            if(req.baseUrl == "/api") {
                res.send({update_result : result1, err : err, session : req.session});
            } else {
                res.redirect('/user/admin/page/1');
            }
        });
    })
};



exports.user_edit_save = user_edit_save


const user_add = function (req,res) {
    foreignDatas_GetAll(db,db.config.database,'user',function (err,foreignKeys,foreignKeysTables,foreignDatasObj){
        if (err) console.log('err', err)
        res.render('user_add',{foreignKeys : foreignKeys,foreignKeysTables : foreignKeysTables, foreignDatasObj : foreignDatasObj, err : err, session : req.session});
    });
};



exports.user_add = user_add


const user_add_save = function (req,res) {
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
        user_module.user_add(data_insert,function (err,result1) {
            if (err) console.log('error',err);
            doc_module.uploadFile('./public/img/user/',result1.insertId,files,'main','main','jpg', function (err,count1){

                if (err) console.log(err)

                console.log('count1 : ',count1)
                doc_module.uploadMultiFile('./public/img/user/',result1.insertId,files,'jpg', function (err,count2){

                    if (err) console.log(err)

                    console.log('count2 : ',count2)

                    user_module.user_update(result1.insertId,{user_pic_count:count2})

                });             });
            if(req.baseUrl == "/api") {
                res.send({insert_result : result1, err : err, session : req.session});
            } else {
                res.redirect('/user/admin/page/1');
            }
        });
    })
};



exports.user_add_save = user_add_save


const user_delete = function (req,res) {
    const id = req.params.id;
    user_module.user_delete(id,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({delete_result : result1, err : err, session : req.session});
        } else {
            res.redirect('/user/admin/page/1');
        }
    });
};



exports.user_delete = user_delete


const user_filter = function (req,res) {
    const filter = req.params.filter;
    user_module.user_filter(filter,function (err,result1) {
        if (err) console.log('error',err);
        if(req.baseUrl == "/api") {
            res.send({user : result1, err : err, session : req.session});
        } else {
            res.render('user_list_admin',{user : result1, err : err, session : req.session});
        }
    });
};



exports.user_filter = user_filter


