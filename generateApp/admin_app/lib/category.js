const database_module=require('./database');

const category_get_all = function(callback){
 let sql='SELECT * from category order by cat_id ASC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.category_get_all = category_get_all;


const category_get_all_top = function(top,callback){
let sql='SELECT * from category order by cat_id ASC limit ?';
database_module.db.query(sql,[top], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.category_get_all_top = category_get_all_top;


const category_get_one = function(cat_id,callback){
 let sql='SELECT * from  category where cat_id =?';
database_module.db.query(sql,[cat_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.category_get_one = category_get_one;


const category_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into category '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.category_add = category_add;


const category_update = function(id,data,callback){
let sql = 'update category set ? where cat_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.category_update = category_update;


const category_delete = function(id,callback){
let sql = 'delete from category where cat_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.category_delete = category_delete;


const category_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from category where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.category_get_filter = category_get_filter;


const category_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from category" +

filter+"\n" +

"group by cat_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.category_get_filter_multi = category_get_filter_multi;


let category_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from category";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.category_count_page = category_count_page;


let category_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM category \n" +
// "order by ? ?\n"+
" order by cat_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.category_get_all_limit = category_get_all_limit;


