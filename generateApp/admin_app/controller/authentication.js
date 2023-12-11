const user_module = require('../lib/user');


let isAuthenticated = function (req,res,next) {

    if (req.session.loggedin) {

        next();
    }
    else {
         res.redirect('/');
        //req.session.userid = 1;
        //next();
    }
};



let isAdmin = function (req,res,next) {

    console.log(req.session)

    if (req.session.privid == 1 || req.session.privid == 2 || req.session.privid == 999) {

        next();
    }
    else
    {
        res.redirect('/');
    }
};



let isClient = function (req,res,next) {

    if (req.session.privid == 3) {


        next();
    }
    else
    {
        res.redirect('/');
    }
};



let ClientCompelte = function (req,res,next) {


    user_module.user_get_one_allinfo(req.session.userid,function (err,result){

        if (err) res.redirect('/');

        if (result[0].user_name !== '' && result[0].user_name != null && result[0].user_lastname !== '' && result[0].user_lastname != null && result[0].user_address !== '' && result[0].user_address != null && result[0].user_phone !== '' && result[0].user_phone != null ) {

            next();
        }
        else {
            res.redirect('/profil');

        }

    })
};


exports.isAuthenticated = isAuthenticated;
exports.isAdmin = isAdmin;
exports.isClient = isClient;
exports.ClientCompelte = ClientCompelte;
