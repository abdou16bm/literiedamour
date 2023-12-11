const database_module=require('./database');

const user_shop_get_all = function(callback){ 
 let sql='SELECT * from user_shop order by shop_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_shop_get_all = user_shop_get_all;


const user_shop_get_one = function(shop_id,callback){ 
 let sql='SELECT * from  user_shop where shop_id =?';
database_module.db.query(sql,[shop_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_shop_get_one = user_shop_get_one;


const user_shop_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into user_shop '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_shop_add = user_shop_add;


const user_shop_update = function(id,data,callback){ 
let sql = 'update user_shop set ? where shop_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_shop_update = user_shop_update;


const user_shop_delete = function(id,callback){ 
let sql = 'delete from user_shop where shop_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_shop_delete = user_shop_delete;


const user_shop_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from user_shop where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.user_shop_get_filter = user_shop_get_filter;


const user_shop_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from user_shop" +

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


exports.user_shop_get_filter_multi = user_shop_get_filter_multi;


let user_shop_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from user_shop";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.user_shop_count_page = user_shop_count_page;


let user_shop_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM user_shop \n" +
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
exports.user_shop_get_all_limit = user_shop_get_all_limit;


