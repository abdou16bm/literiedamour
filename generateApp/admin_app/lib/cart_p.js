const database_module=require('./database');

const cart_p_get_all = function(callback){
 let sql='SELECT * from cart_p order by product_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_p_get_all = cart_p_get_all;


const cart_p_get_one = function(product_id,callback){
 let sql='SELECT * from  cart_p where product_id =?';
database_module.db.query(sql,[product_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_p_get_one = cart_p_get_one;

const cart_p_get_one_cart = function(cart_id,callback){

    let sql='SELECT * from  cart_p cp\n' +
    'inner join product p on p.product_id = cp.product_id\n' +
    'where cart_id =?';

    database_module.db.query(sql,[cart_id], function (error, results, fields) {
    if (error) console.log('error : ',error);
    //console.log('results: ', results);
    if (callback){callback(error,results)};
    return results;
    });

};


exports.cart_p_get_one_cart = cart_p_get_one_cart;

const cart_p_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into cart_p '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_p_add = cart_p_add;


const cart_p_update = function(id,data,callback){
let sql = 'update cart_p set ? where product_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_p_update = cart_p_update;


const cart_p_update2 = function(data,product_id,cart_id,callback){
    let sql = 'update cart_p set ? where product_id =? and cart_id = ?';
    database_module.db.query(sql,[data,product_id,cart_id], function (error, results, fields) {
    if (error) console.log('error : ',error);
    //console.log('results: ', results);
    if (callback){callback(error,results)};
    return results;
    });
    };


    exports.cart_p_update2 = cart_p_update2;


const cart_p_delete = function(product_id,cart_id,callback){
let sql = 'delete from cart_p where product_id =? and cart_id = ?';
database_module.db.query(sql,[product_id,cart_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_p_delete = cart_p_delete;


const cart_p_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from cart_p where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.cart_p_get_filter = cart_p_get_filter;


const cart_p_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from cart_p" +

filter+"\n" +

"group by product_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.cart_p_get_filter_multi = cart_p_get_filter_multi;


let cart_p_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from cart_p";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.cart_p_count_page = cart_p_count_page;


let cart_p_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM cart_p \n" +
// "order by ? ?\n"+
" order by product_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.cart_p_get_all_limit = cart_p_get_all_limit;


