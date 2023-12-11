const database_module=require('./database');

const shop_get_all = function(callback){ 
 let sql='SELECT * from shop order by shop_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.shop_get_all = shop_get_all;


const shop_get_one = function(shop_id,callback){ 
 let sql='SELECT * from  shop where shop_id =?';
database_module.db.query(sql,[shop_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.shop_get_one = shop_get_one;


const shop_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into shop '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.shop_add = shop_add;


const shop_update = function(id,data,callback){ 
let sql = 'update shop set ? where shop_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.shop_update = shop_update;


const shop_delete = function(id,callback){ 
let sql = 'delete from shop where shop_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.shop_delete = shop_delete;


const shop_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from shop where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.shop_get_filter = shop_get_filter;


const shop_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from shop" +

filter+"\n" +

"group by shop_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.shop_get_filter_multi = shop_get_filter_multi;


let shop_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from shop";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.shop_count_page = shop_count_page;


let shop_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM shop \n" +
// "order by ? ?\n"+
" order by shop_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.shop_get_all_limit = shop_get_all_limit;


