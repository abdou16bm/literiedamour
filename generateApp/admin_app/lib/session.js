

let  session_create = function (req,res,data) {

    req.session.loggedin = data.loggedin;
    req.session.username = data.username;
    req.session.name = data.name;
    req.session.lname = data.lname;
    req.session.userid = data.user_id;
    req.session.user_id_s = data.user_id_s;
    req.session.privid = data.privid;
    req.session.shop_id = data.shop_id;
    req.session.location = '/';
    //req.session.localisation = info;

    // SESSION TIMEOUT
    var timeout = data.timeout ;  //1 minute = 60000  // 1 hour = 3600000
    req.session.cookie.expires = new Date(Date.now() + timeout);
    req.session.cookie.maxAge = timeout;


};



exports.session_create = session_create;
