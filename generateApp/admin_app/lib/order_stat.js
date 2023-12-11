const database_module=require('./database');

const order_stat_get_all = function(callback){ 
 let sql='SELECT * from order_stat order by stat_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_stat_get_all = order_stat_get_all;


const order_stat_get_one = function(stat_id,callback){ 
 let sql='SELECT * from  order_stat where stat_id =?';
database_module.db.query(sql,[stat_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_stat_get_one = order_stat_get_one;


const order_stat_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into order_stat '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_stat_add = order_stat_add;


const order_stat_update = function(order_id,data,callback){ 
let sql = 'update order_stat set ? where order_id =?';
database_module.db.query(sql,[data,order_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_stat_update = order_stat_update;


const order_stat_delete = function(id,callback){ 
let sql = 'delete from order_stat where stat_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_stat_delete = order_stat_delete;


const order_stat_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from order_stat where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_stat_get_filter = order_stat_get_filter;


const order_stat_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from order_stat" +

filter+"\n" +

"group by stat_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.order_stat_get_filter_multi = order_stat_get_filter_multi;


let order_stat_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from order_stat";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.order_stat_count_page = order_stat_count_page;


let order_stat_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM order_stat \n" +
// "order by ? ?\n"+
" order by stat_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.order_stat_get_all_limit = order_stat_get_all_limit;


