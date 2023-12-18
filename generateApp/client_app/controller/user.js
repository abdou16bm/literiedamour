const wilaya_module = require("../../admin_app/lib/wilaya")
const user_module = require("../../admin_app/lib/user")
const user_default_module = require("../../admin_app/lib/user_default")
const form_check_module = require("../../admin_app/lib/form_check")
const cart_module = require("../../admin_app/lib/cart")
const mail_module = require("../../admin_app/lib/mail")
const session_module = require("../../admin_app/lib/session")



const signup = function (req,res) {

    wilaya_module.wilaya_get_all(function (err,result){

        if (err) console.log('Error : ',err);

        res.render("signup",{
            
            wilaya : result,
            session : req.session,
            err : req.query.err       
        
       })
    
    })    

}

const signup_save = function (req,res) {

    const input = req.body;

    console.log("body : ",input)

    let values_check = [input.lastname,input.name,input.phone,input.email,input.address,input.wilaya,input.username,input.password,input.password_c]

    form_check_module.form_check(values_check,function (result) {

        console.log("form check result : ",result)
        if (result.statusNumber == 1) {console.log("informations missed");res.redirect("/signup?err=1")}
        else if (result.statusNumber == 0) {
    
            if (input.password != input.password_c) {
                
                console.log("confirmation incorrect");
                res.redirect("/signup?err=2")

            } else {

                if (input.password.length < 6) {
                
                    console.log("password length error");
                    res.redirect("/signup?err=3")
    
                } else {

                    user_module.user_get_filter_equal('user_username',input.username,function (err,result){

                        if (result.length > 0) {
                            
                            console.log("username exists");
                            res.redirect("/signup?err=4")
                            
                        }
                        else {
                
    
                            let data_user = {
    
                                user_lastname : input.lastname.trim(),
                                user_name    : input.name.trim(), 
                                user_phone   : input.phone.trim(), 
                                user_email   : input.email.trim(),                         
                                user_address   : input.address.trim(),       
                                user_username   : input.username.trim(),
                                user_password   : input.password.trim(),
                                wilaya_id  : input.wilaya,
                                user_status   : 0,
                                priv_id : 3
            
                            };
    
          
                            user_default_module.user_add(data_user,function (err,result1) {
    
                                if (err) console.log(err)
                            
                                let data_cart = {cart_date : new Date(), cart_status : 1, user_id : result1.insertId}

                                cart_module.cart_add(data_cart,function (err,result2) {

                                    if (err) console.log(err)

                                    let confirm_code = Math.floor(Math.random()*999999) + 111111
                              
                                    req.session["confirm_code"] = confirm_code
                                    req.session["confirm_user"] = result1.insertId

                                    console.log("confirm code is : ",req.session["confirm_code"])
                                    console.log("confirm user is : ",req.session["confirm_user"])

                                    let to = input.email.trim();
                                    let subject = "Confirmation email"
                                    let text = "<strong>Votre code de confirmation : </strong>"
                                    let html = text + req.session["confirm_code"]

                                    mail_module.send_mail(to,subject,text,html,"Literie d'Amour",function (err,result3) {

                                        if (err) {

                                            console.log('err : ',err);
                                            res.redirect("/signup?err=5")

                                        } else {

                                            console.log("signup success");
                                            res.redirect("/confirm/email")

                                        }

                                    })

                                })
    
                            })
        
                        }
                  
                    })

                }

            }
    
        }
    
    })
    
}



const confirm_email = function (req, res) {

    res.render('confirm_email',{session : req.session, err : req.query.err});

}

const confirm_email_valid = function (req, res) {

    let values_check = [req.session["confirm_code"],req.session["confirm_user"]]

    form_check_module.form_check(values_check,function (result) {

        console.log("form check result : ",result)
        if (result.statusNumber == 1) {console.log("confirm code or user missed");res.redirect("/confirm/email?err=1")}
        else if (result.statusNumber == 0) {

            if (req.body.confirmCode != req.session["confirm_code"]) {
                
                console.log("confirm code error")
                res.redirect("/confirm/email?err=2")
    
            } else {
    
                let user_id = req.session["confirm_user"]
                let data_update = {user_status : 1}
    
                user_module.user_update(user_id,data_update,(err,result) => {
                    
                    if (err) console.log('err : ',err) ;
    
                    delete req.session["confirm_code"]
                    delete req.session["confirm_user"]

                    console.log("session deleted")
    
                    res.redirect("/login")
    
                })
    
            }

        }

    })

}


const login = function (req, res) {

    res.render('login',{session : req.session, err:req.query.err});

}


const login_check = function (req, res) {

    const input = req.body

    let values_check = [input.username,input.password]

    form_check_module.form_check(values_check,function (result) {

        console.log("form check result : ",result)
        if (result.statusNumber == 1) {console.log("informations missed");res.redirect("/login?err=1")}
        else if (result.statusNumber == 0) {

            user_default_module.user_connect(input.username,input.password,function (err,result1) {

                if (result1.loggedin == true) {

                    user_module.user_get_one(result1.user_id,function (err,result2) {

                        if (err) console.log('err : ',err) ;

                        if (result2[0].user_status == 0) {

                            
                            let confirm_code = Math.floor(Math.random()*999999) + 111111
                              
                            req.session["confirm_code"] = confirm_code
                            req.session["confirm_user"] = result2[0].user_id

                            console.log("confirm code is : ",req.session["confirm_code"])
                            console.log("confirm user is : ",req.session["confirm_user"])

                            let to = result2[0].user_email;
                            let subject = "Confirmation email"
                            let text = "<strong>Votre code de confirmation : </strong>"
                            let html = text + req.session["confirm_code"]

                            mail_module.send_mail(to,subject,text,html,"Literie d'Amour",function (err,result3) {

                                if (err) {

                                    console.log('err : ',err);
                                    res.redirect("/login?err=3")

                                } else {

                                    console.log("email send");
                                    res.redirect("/confirm/email")

                                }

                            })
                            
                        } else {
    
                            let session_data = {
    
                                loggedin : true,
                                username : result2[0].user_username,
                                name : result2[0].user_name,
                                lname : result2[0].user_lastname,
                                user_id : result2[0].user_id,
                                user_id_s : result2[0].user_id_s,
                                privid : result2[0].priv_id,
                                shop_id : null,
                                cart_id : result2[0].cart_id,
                                timeout : 3600000,
                                location : '/'
                            };
    
                            session_module.session_create(req,res,session_data);

                            console.log('connected')
                            res.redirect('/');
    
                        }             
                    
                    })
                
                } else {

                    console.log("informations error")
                    res.redirect("/login?err=2")

                }
            })

        }
    
    })

}



const logout = function (req, res) {


    req.session.destroy(function (err) {
        if (err) {
            return err;
        } else {

            return res.redirect('/');
        }
    });

}




const account_edit = function (req,res) {

    wilaya_module.wilaya_get_all(function (err,result){

        if (err) console.log('Error : ',err);

        res.render("account",{
            
            wilaya : result,
            session : req.session,
            err : req.query.err       
        
       })
    
    })    

}


const account_edit_save = function (req,res) {

    const input = req.body;
    const user_id = req.session.userid

    console.log("body : ",input)

    let values_check = [input.username,input.password,input.password_c]

    form_check_module.form_check(values_check,function (resultCheck) {

        console.log("form check result : ",resultCheck)
        if (resultCheck.statusNumber == 1) {console.log("informations missed");res.redirect("/account?err=1")}
        else if (resultCheck.statusNumber == 0) {

            if (input.password != input.password_c) {
                
                console.log("confirmation incorrect");
                res.redirect("/account?err=2")

            } else {


                if (input.password.length < 6) {
                
                    console.log("password length error");
                    res.redirect("/account?err=3")
    
                } else {

                    user_module.user_get_filter_equal('user_username',input.username,function (err,result){

                        if (result.length > 0 && result[0].user_id != req.session.userid) {
                            
                            console.log("username exists");
                            res.redirect("/account?err=4")
                            
                        }
                        else {

                            let data_user = {
         
                                user_username   : input.username.trim(),
                                user_password   : input.password.trim()
            
                            };

                            user_default_module.user_update(user_id,data_user,function (err,result1) {

                                if (err) console.log(err)

                                req.session.username = input.username.trim();

                                res.redirect("/account?err=0")
                                                               
                            })

                        }
                    
                    })

                }

            }

        }
    
    })

}


module.exports = {

    signup,
    signup_save,
    confirm_email,
    confirm_email_valid,
    login,
    login_check,
    logout,
    account_edit,
    account_edit_save

}