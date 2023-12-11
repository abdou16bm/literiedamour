const database_module=require('./database');

const property_type_get_all = function(callback){ 
 let sql='SELECT * from property_type order by property_type_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.property_type_get_all = property_type_get_all;


const property_type_get_one = function(property_type_id,callback){ 
 let sql='SELECT * from  property_type where property_type_id =?';
database_module.db.query(sql,[property_type_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.property_type_get_one = property_type_get_one;


const property_type_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into property_type '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.property_type_add = property_type_add;


const property_type_update = function(id,data,callback){ 
let sql = 'update property_type set ? where property_type_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.property_type_update = property_type_update;


const property_type_delete = function(id,callback){ 
let sql = 'delete from property_type where property_type_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.property_type_delete = property_type_delete;


const property_type_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from property_type where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.property_type_get_filter = property_type_get_filter;


const property_type_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from property_type" +

filter+"\n" +

"group by property_type_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.property_type_get_filter_multi = property_type_get_filter_multi;


let property_type_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from property_type";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.property_type_count_page = property_type_count_page;


let property_type_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM property_type \n" +
// "order by ? ?\n"+
" order by property_type_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.property_type_get_all_limit = property_type_get_all_limit;


