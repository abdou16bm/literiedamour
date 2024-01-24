const database_module=require('./database');

const privilege_get_all = function(callback){
 let sql='SELECT * from privilege order by priv_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.privilege_get_all = privilege_get_all;


const privilege_get_one = function(priv_id,callback){
 let sql='SELECT * from  privilege where priv_id =?';
database_module.db.query(sql,[priv_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.privilege_get_one = privilege_get_one;


const privilege_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into privilege '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.privilege_add = privilege_add;


const privilege_update = function(id,data,callback){
let sql = 'update privilege set ? where priv_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.privilege_update = privilege_update;


const privilege_delete = function(id,callback){
let sql = 'delete from privilege where priv_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.privilege_delete = privilege_delete;


const privilege_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from privilege where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.privilege_get_filter = privilege_get_filter;


const privilege_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from privilege" +

filter+"\n" +

"group by priv_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.privilege_get_filter_multi = privilege_get_filter_multi;


let privilege_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from privilege";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.privilege_count_page = privilege_count_page;


let privilege_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM privilege \n" +
// "order by ? ?\n"+
" order by priv_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.privilege_get_all_limit = privilege_get_all_limit;


