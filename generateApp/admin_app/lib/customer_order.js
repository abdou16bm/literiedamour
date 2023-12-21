const database_module=require('./database');

const customer_order_get_all = function(callback){ 
 let sql='SELECT co.*,dp.delivery_price,user.user_lastname,user.user_name,w.wilaya_name,os.stat_id,s.stat_name,COUNT(co.order_id) AS products_count from customer_order co\n' +
 'LEFT JOIN user ON user.user_id = co.user_id\n' +
 'LEFT JOIN order_stat os ON os.order_id = co.order_id\n' +
 'LEFT JOIN status s ON s.stat_id = os.stat_id\n' +
 'LEFT JOIN wilaya w ON w.wilaya_id = user.wilaya_id\n' +
 'LEFT JOIN delivery_price dp ON dp.wilaya_id = user.wilaya_id\n' +
 'LEFT JOIN order_p op ON op.order_id = co.order_id\n' +
 'GROUP BY co.order_id\n' +
 'order by co.order_id DESC';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.customer_order_get_all = customer_order_get_all;


const customer_order_get_all_count = function(callback){ 
    let sql = 'select count(*) as orders_count from customer_order';
    database_module.db.query(sql,[], function (error, results, fields) {
    if (error) console.log('error : ',error);
    //console.log('results: ', results);
    if (callback){callback(error,results)};
    return results;
    });
    };
    
    
exports.customer_order_get_all_count = customer_order_get_all_count;


const customer_order_get_all_count_year = function(callback){ 
    let sql = "SELECT COUNT(*) AS order_count FROM customer_order co\n" +
    "WHERE YEAR(DATE(co.order_date)) = YEAR(CURDATE())"
    database_module.db.query(sql, function (error, results, fields) {
    if (error) console.log('error : ',error);
    //console.log('results: ', results);
    if (callback){callback(error,results)};
    return results;
    });
    };
    
    
exports.customer_order_get_all_count_year = customer_order_get_all_count_year;


const customer_order_get_one = function(order_id,callback){ 
 let sql='SELECT co.*,dp.delivery_price,user.user_lastname,user.user_name,user.user_address,user.user_email,user.user_phone,w.wilaya_name,os.stat_id,s.stat_name,COUNT(co.order_id) AS products_count from customer_order co\n' +
 'LEFT JOIN user ON user.user_id = co.user_id\n' +
 'LEFT JOIN order_stat os ON os.order_id = co.order_id\n' +
 'LEFT JOIN status s ON s.stat_id = os.stat_id\n' +
 'LEFT JOIN wilaya w ON w.wilaya_id = user.wilaya_id\n' +
 'LEFT JOIN delivery_price dp ON dp.wilaya_id = user.wilaya_id\n' +
 'LEFT JOIN order_p op ON op.order_id = co.order_id\n' +
 'where co.order_id = ?\n' +
 'GROUP BY co.order_id';
database_module.db.query(sql,[order_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.customer_order_get_one = customer_order_get_one;


const customer_order_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into customer_order '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.customer_order_add = customer_order_add;


const customer_order_update = function(id,data,callback){ 
let sql = 'update customer_order set ? where order_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.customer_order_update = customer_order_update;


const customer_order_delete = function(id,callback){ 
let sql = 'delete from customer_order where order_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.customer_order_delete = customer_order_delete;


const customer_order_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from customer_order where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.customer_order_get_filter = customer_order_get_filter;


const customer_order_get_filter_multi = function (filter_field,callback) {
let fields = Object.keys(filter_field);
let filter = '';
console.log(fields)


for (var i=0; i < fields.length; i++)
{
if (filter_field[fields[i]].length && i == 0)
{
if (filter == '') filter += " where ";
filter += fields[i] + " in ('" + filter_field[fields[i]].join("','") +"') ";
}
else if (filter_field[fields[i]].length && i > 0)
{
if (filter == '') filter += " where ";
filter += " or "+fields[i] + " in ('" + filter_field[fields[i]].join("','") +"') ";
}
}
let sql = "select * from customer_order" +

filter+"\n" +

"group by order_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.customer_order_get_filter_multi = customer_order_get_filter_multi;


let customer_order_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from customer_order";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.customer_order_count_page = customer_order_count_page;


let customer_order_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM customer_order \n" +
// "order by ? ?\n"+
" order by order_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.customer_order_get_all_limit = customer_order_get_all_limit;



const customer_order_generate = function(user_id,callback){ 

    let sqlCount = "SELECT COUNT(*) AS order_count FROM customer_order co\n" +
    "WHERE YEAR(DATE(co.order_date)) = YEAR(CURDATE())"

    database_module.db.query(sqlCount,function (error, result1, fields) {

        if (error) console.log('error : ',error);  
      
        let sqlTotal = "select IFNULL(SUM(cp.product_price_c * cp.product_qt_c),0) AS totalCart from cart_p cp\n" +
        "inner join cart c on c.cart_id = cp.cart_id\n" +
        "where c.user_id = ?"

        database_module.db.query(sqlTotal,[user_id], function (error, result2, fields) {

            if (error) console.log('error : ',error);

            if (result2.length > 0 && result2[0].totalCart > 0) {
            
                let orderYear = new Date().getFullYear()
                let orderCount = result1[0].order_count+1
                let orderRef = orderYear + "-" + orderCount.toString().padStart(5,"0")

                console.log("reference order : ",orderRef)

                let sqlGenerate = 
            
                "insert into customer_order (order_ref,order_date,order_status,order_total_price,user_id)\n" +
                "values ('"+orderRef+"',NOW(),1,"+result2[0].totalCart+","+user_id+");\n" +
    
                "insert into order_stat (stat_id,order_id,order_stat_date)\n" +
                "values (1,(SELECT MAX(LAST_INSERT_ID(order_id)) FROM customer_order),NOW());\n" +
    
                "insert into order_p ( `order_id`,`product_id`, `product_qt_o`, `product_price_o`,`product_order_status`)\n" +
                "SELECT (SELECT MAX(LAST_INSERT_ID(order_id))  FROM customer_order),cart_p.product_id,product_qt_c,product_price_c,1 from cart_p\n" +
                "INNER JOIN cart ON cart.cart_id = cart_p.cart_id\n" +
                "INNER JOIN product ON product.product_id = cart_p.product_id\n" +
                "WHERE cart.user_id = "+user_id+";\n" +
    
                "delete cart_p from cart_p \n" +
                "inner join cart c on c.cart_id = cart_p.cart_id\n" +
                "where c.user_id = " + user_id;
    
                database_module.db.query(sqlGenerate,function (error, results, fields) {
            
                    if (error) console.log('error : ',error);
    
                    console.log("cart valid.")
                    if (callback){callback(error,results)};
                    return results;
            
                });
    
            } else {
    
                console.log("empty cart.")
                if (callback){callback({code :"EMPTY_CART"},[])};
                return [];
    
            }
        
        
        })  
    
    })

};


exports.customer_order_generate = customer_order_generate;




const customer_order_get_all_user = function(user_id,callback){ 
let sql='SELECT co.*,dp.delivery_price,user.user_lastname,user.user_name,w.wilaya_name,os.stat_id,s.stat_name,COUNT(co.order_id) AS products_count from customer_order co\n' +
'LEFT JOIN user ON user.user_id = co.user_id\n' +
'LEFT JOIN order_stat os ON os.order_id = co.order_id\n' +
'LEFT JOIN status s ON s.stat_id = os.stat_id\n' +
'LEFT JOIN wilaya w ON w.wilaya_id = user.wilaya_id\n' +
'LEFT JOIN delivery_price dp ON dp.wilaya_id = user.wilaya_id\n' +
'LEFT JOIN order_p op ON op.order_id = co.order_id\n' +
'WHERE co.user_id = ?\n' +
'GROUP BY co.order_id\n' +
'order by co.order_id DESC';
database_module.db.query(sql,[user_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.customer_order_get_all_user = customer_order_get_all_user;