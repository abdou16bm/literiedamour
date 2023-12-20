const user_module = require('../lib/user_default');
const session_module = require('../lib/session');
const order_p_module = require("../lib/order_p")

const formidable = require('formidable');

let user_login = function (req,res) {

    let err = req.query.err;
    console.log(err)

    res.render('login',{err:err});
};


let user_login_check = function (req,res) {

    let username = req.body.singin_username,
        password = req.body.singin_password;

    if (username && password && username.length && password.length && username != '' && password != '') {

        console.log('admin test connection')

        user_module.user_connect(username,password,function (err,result1) {


            console.log('result1',result1)


            if (result1.loggedin == true ) {

                console.log('admin connected')

                user_module.user_get_one(result1.user_id,function (err,result2) {

                    if (err) console.log('err : ',err) ;

                    console.log('result2',result2)

                    let session_data = {

                        loggedin : true,
                        username : username,
                        name : result2[0].user_name,
                        lname : result2[0].user_lastname,
                        user_id : result2[0].user_id,
                        user_id_s : result2[0].user_id_s,
                        privid : result2[0].priv_id,
                        shop_id : result2[0].shop_id,
                        timeout : 3600000,
                        location : '/'
                    };

                    session_module.session_create(req,res,session_data);


                    console.log('redirect to home')

                    return res.redirect('/home');

                })
            }
            else if (result1.loggedin == true && result1.privid == 999) {

                req.session.loggedin = true;
                req.session.username = username;
                req.session.privid = result1.privid;

                console.log('root connected')


                return res.redirect('/home');
            }
            else {

                res.redirect('/?err=1');
            }

        })
    }
    else
    {
        res.redirect('/?err=1');

    }

};


let user_logout = function (req,res) {

    req.session.destroy(function (err) {
        if (err) {
            return err;
        } else {

            return res.redirect('/');
        }
    });
};



let user_edit = function (req,res) {

    res.render('profil',
        {
            session : req.session
        });
};



let user_edit_save = function (req,res) {

    let id = req.session.userid;
    let username = req.session.username;

    let form = new formidable.IncomingForm();

    var data = {};

    form.parse(req, function (err, fields, files) {
        console.log('fields',fields)

        user_module.user_connect(username,fields.password,function (err,result1){
            if (err) console.log(err)

            console.log(result1)

            if (result1.loggedin == true){

                if (fields.passwordNew == fields.passwordNewC && fields.passwordNew != '' && fields.passwordNew.length > 6)
                {
                    let data_update = {
                        user_username : fields.username,
                        user_password : fields.passwordNew
                    }
                    user_module.user_update(id,data_update,function (err,result){
                        if (err) console.log(err)
                        console.log(result)

                        req.session.username = data_update.user_username;
                        res.redirect('/profil');
                    })
                }
                else  if (fields.passwordNew == '' && fields.passwordNewC == ''){
                    let data_update = {
                        user_username : fields.username
                    }
                    user_module.user_update(id,data_update,function (err,result){
                        if (err) console.log(err)
                        console.log(result)

                        req.session.username = data_update.user_username;
                        res.redirect('/profil');
                    })
                }
                else {

                    res.render('profil',
                        {
                            session : req.session,
                            err : 'Les mot de passe saise ne corespondent pas ou inferieur à 6!'
                        });
                }

            }
            else {

                res.render('profil',
                    {
                        session : req.session,
                        err : 'Votre mot de passe est incrrecte !'
                    });
            }



        })

    })
};



const user_profil_edit = function (req, res) {

    var user_id = req.session.userid

    user_module.user_get_one(user_id,(err,result)=>{

        if (err) console.log('Error : ',err);

        res.render("profil",{
            
            user : result,
            session :  req.session,
            err : req.query.err
        
        })

    })

}


const user_profil_edit_save = (req,res) => {
   
    let body = req.body;
    let user_id = req.session.userid

    if (

        typeof(body.username) != "undefined" && body.username !== "" && body.username !== null
        && typeof(body.password) != "undefined" && body.password !== "" && body.password !== null

    ) {

        if (body.password.length > 6 && body.password == body.password_c) {

            
            user_module.user_get_filter("user_username",body.username.trim(),1,function (err,result1) {
                
                if (err) {console.log('err : ',err)}

                if (result1.length <= 0 || (result1.length > 0 && req.session.username == body.username)) {
                    
                    let data_update = {

                        user_username : body.username.trim(),
                        user_password : body.password.trim()
        
                    }
        
        
                    user_module.user_update(user_id,data_update,(err,result2) => {
                            
                        if (err) {console.log('err : ',err)}
                    
                        console.log("old : ",req.session.username)
                        req.session.username = body.username
                        console.log("new : ",req.session.username)
                
                        res.redirect("/profil?err=0")
                    
                    
                    })

                } else {res.redirect("/profil?err=3")}

                
            })
  
        } else {res.redirect("/profil?err=2")}

  
    } else {res.redirect("/profil?err=1")}

}



const stats = function (req,res) {


    order_p_module.order_p_get_stats(function (err,result1) {

        if (err) console.log(err)

        res.render("stats",{product : result1, err : err, session : req.session})
        
    })
    
}




exports.user_login = user_login;
exports.user_login_check = user_login_check;
exports.user_logout = user_logout;
exports.user_edit = user_edit;
exports.user_edit_save = user_edit_save;
exports.user_profil_edit = user_profil_edit;
exports.user_profil_edit_save = user_profil_edit_save;
exports.stats = stats
