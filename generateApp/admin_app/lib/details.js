const database_module=require('./database');

const details_get_all = function(callback){
 let sql='SELECT * from details order by detail_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.details_get_all = details_get_all;


const details_get_all_sub_category = function(sub_cat,callback){

    let sql='SELECT * from details\n' +
    'WHERE sub_cat_id in ('+sub_cat+')\n' +
    'order by detail_id ASC ';
   database_module.db.query(sql,function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
   };


   exports.details_get_all_sub_category = details_get_all_sub_category;


const details_get_one = function(detail_id,callback){
 let sql='SELECT * from  details where detail_id =?';
database_module.db.query(sql,[detail_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.details_get_one = details_get_one;


const details_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into details '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.details_add = details_add;


const details_update = function(id,data,callback){
let sql = 'update details set ? where detail_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.details_update = details_update;


const details_delete = function(id,callback){
let sql = 'delete from details where detail_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.details_delete = details_delete;


const details_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from details where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.details_get_filter = details_get_filter;


const details_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from details" +

filter+"\n" +

"group by detail_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.details_get_filter_multi = details_get_filter_multi;


let details_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from details";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.details_count_page = details_count_page;


let details_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM details \n" +
// "order by ? ?\n"+
" order by detail_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.details_get_all_limit = details_get_all_limit;


