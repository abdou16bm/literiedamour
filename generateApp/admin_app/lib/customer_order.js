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


