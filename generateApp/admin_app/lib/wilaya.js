const database_module=require('./database');

const wilaya_get_all = function(callback){
 let sql='SELECT * from wilaya order by wilaya_id';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.wilaya_get_all = wilaya_get_all;


const wilaya_get_one = function(wilaya_id,callback){
 let sql='SELECT * from  wilaya where wilaya_id =?';
database_module.db.query(sql,[wilaya_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.wilaya_get_one = wilaya_get_one;


const wilaya_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into wilaya '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.wilaya_add = wilaya_add;


const wilaya_update = function(id,data,callback){
let sql = 'update wilaya set ? where wilaya_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.wilaya_update = wilaya_update;


const wilaya_delete = function(id,callback){
let sql = 'delete from wilaya where wilaya_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.wilaya_delete = wilaya_delete;


const wilaya_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from wilaya where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.wilaya_get_filter = wilaya_get_filter;


const wilaya_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from wilaya" +

filter+"\n" +

"group by wilaya_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.wilaya_get_filter_multi = wilaya_get_filter_multi;


let wilaya_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from wilaya";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.wilaya_count_page = wilaya_count_page;


let wilaya_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM wilaya \n" +
// "order by ? ?\n"+
" order by wilaya_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.wilaya_get_all_limit = wilaya_get_all_limit;


