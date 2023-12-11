const database_module=require('./database');

const opinion_get_all = function(callback){ 
 let sql='SELECT * from opinion order by opinion_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.opinion_get_all = opinion_get_all;


const opinion_get_one = function(opinion_id,callback){ 
 let sql='SELECT * from  opinion where opinion_id =?';
database_module.db.query(sql,[opinion_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.opinion_get_one = opinion_get_one;


const opinion_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into opinion '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.opinion_add = opinion_add;


const opinion_update = function(id,data,callback){ 
let sql = 'update opinion set ? where opinion_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.opinion_update = opinion_update;


const opinion_delete = function(id,callback){ 
let sql = 'delete from opinion where opinion_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.opinion_delete = opinion_delete;


const opinion_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from opinion where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.opinion_get_filter = opinion_get_filter;


const opinion_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from opinion" +

filter+"\n" +

"group by opinion_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.opinion_get_filter_multi = opinion_get_filter_multi;


let opinion_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from opinion";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.opinion_count_page = opinion_count_page;


let opinion_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM opinion \n" +
// "order by ? ?\n"+
" order by opinion_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.opinion_get_all_limit = opinion_get_all_limit;


