const database_module=require('./database');

const order_p_get_all = function(callback){ 
 let sql='SELECT * from order_p order by product_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_get_all = order_p_get_all;


const order_p_get_all_order = function(order_id,callback){ 
    let sql='SELECT * from order_p op\n' +
    'LEFT JOIN product p ON p.product_id = op.product_id\n' +
    'WHERE order_id = ?\n' +
    'order by op.product_id DESC';
   database_module.db.query(sql,[order_id], function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
   };
   
   
   exports.order_p_get_all_order = order_p_get_all_order;


const order_p_get_one = function(product_id,callback){ 
 let sql='SELECT * from  order_p where product_id =?';
database_module.db.query(sql,[product_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_get_one = order_p_get_one;


const order_p_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into order_p '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_add = order_p_add;


const order_p_update = function(id,data,callback){ 
let sql = 'update order_p set ? where product_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_update = order_p_update;


const order_p_delete = function(id,callback){ 
let sql = 'delete from order_p where product_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_delete = order_p_delete;


const order_p_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from order_p where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_get_filter = order_p_get_filter;


const order_p_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from order_p" +

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


exports.order_p_get_filter_multi = order_p_get_filter_multi;


let order_p_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from order_p";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.order_p_count_page = order_p_count_page;


let order_p_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM order_p \n" +
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
exports.order_p_get_all_limit = order_p_get_all_limit;


