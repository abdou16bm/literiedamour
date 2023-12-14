const database_module=require('./database');

const cart_get_all = function(callback){ 
 let sql='SELECT * from cart order by cart_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_get_all = cart_get_all;


const cart_get_one = function(cart_id,callback){ 
 let sql='SELECT * from  cart where cart_id =?';
database_module.db.query(sql,[cart_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_get_one = cart_get_one;

const cart_get_one_user = function(user_id,callback){ 
    let sql="SELECT c.*,COUNT(cp.cart_id) AS productCount,IFNULL(SUM(cp.product_price_c * cp.product_qt_c),0) AS totalPrice from  cart c\n" +
    "LEFT JOIN cart_p cp ON cp.cart_id = c.cart_id\n" +
    "where user_id = ?\n" +
    "GROUP BY c.cart_id";
   database_module.db.query(sql,[user_id], function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
   };
   
   
   exports.cart_get_one_user = cart_get_one_user;


const cart_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into cart '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_add = cart_add;


const cart_update = function(id,data,callback){ 
let sql = 'update cart set ? where cart_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_update = cart_update;


const cart_delete = function(id,callback){ 
let sql = 'delete from cart where cart_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_delete = cart_delete;


const cart_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from cart where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_get_filter = cart_get_filter;


const cart_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from cart" +

filter+"\n" +

"group by cart_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.cart_get_filter_multi = cart_get_filter_multi;


let cart_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from cart";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.cart_count_page = cart_count_page;


let cart_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM cart \n" +
// "order by ? ?\n"+
" order by cart_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.cart_get_all_limit = cart_get_all_limit;


