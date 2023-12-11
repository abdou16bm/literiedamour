const database_module=require('./database');

const ads_get_all = function(callback){ 
 let sql='SELECT * from ads order by ads_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.ads_get_all = ads_get_all;


const ads_get_one = function(ads_id,callback){ 
 let sql='SELECT * from  ads where ads_id =?';
database_module.db.query(sql,[ads_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.ads_get_one = ads_get_one;


const ads_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into ads '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.ads_add = ads_add;


const ads_update = function(id,data,callback){ 
let sql = 'update ads set ? where ads_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.ads_update = ads_update;


const ads_delete = function(id,callback){ 
let sql = 'delete from ads where ads_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.ads_delete = ads_delete;


const ads_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from ads where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.ads_get_filter = ads_get_filter;


const ads_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from ads" +

filter+"\n" +

"group by ads_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.ads_get_filter_multi = ads_get_filter_multi;


let ads_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from ads";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.ads_count_page = ads_count_page;


let ads_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM ads \n" +
// "order by ? ?\n"+
" order by ads_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.ads_get_all_limit = ads_get_all_limit;


