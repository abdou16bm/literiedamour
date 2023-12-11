const database_module=require('./database');

const abonnement_get_all = function(callback){ 
 let sql='SELECT * from abonnement order by abonnement_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.abonnement_get_all = abonnement_get_all;


const abonnement_get_one = function(abonnement_id,callback){ 
 let sql='SELECT * from  abonnement where abonnement_id =?';
database_module.db.query(sql,[abonnement_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.abonnement_get_one = abonnement_get_one;


const abonnement_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into abonnement '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.abonnement_add = abonnement_add;


const abonnement_update = function(id,data,callback){ 
let sql = 'update abonnement set ? where abonnement_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.abonnement_update = abonnement_update;


const abonnement_delete = function(id,callback){ 
let sql = 'delete from abonnement where abonnement_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.abonnement_delete = abonnement_delete;


const abonnement_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from abonnement where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.abonnement_get_filter = abonnement_get_filter;


const abonnement_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from abonnement" +

filter+"\n" +

"group by abonnement_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.abonnement_get_filter_multi = abonnement_get_filter_multi;


let abonnement_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from abonnement";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.abonnement_count_page = abonnement_count_page;


let abonnement_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM abonnement \n" +
// "order by ? ?\n"+
" order by abonnement_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.abonnement_get_all_limit = abonnement_get_all_limit;


