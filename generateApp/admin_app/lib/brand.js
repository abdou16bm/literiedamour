const database_module=require('./database');

const brand_get_all = function(callback){
 let sql='SELECT b.*, COUNT(p.product_id) AS product_count from brand b\n' +
 'LEFT JOIN product p ON p.brand_id = b.brand_id\n' +
 'GROUP BY b.brand_id\n' +
 'order by b.brand_id DESC';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.brand_get_all = brand_get_all;


const brand_get_all_count = function(callback){
    let sql = 'select count(*) as brand_count from brand';
    database_module.db.query(sql,[], function (error, results, fields) {
    if (error) console.log('error : ',error);
    //console.log('results: ', results);
    if (callback){callback(error,results)};
    return results;
    });
    };


exports.brand_get_all_count = brand_get_all_count;


const brand_get_one = function(brand_id,callback){
 let sql='SELECT * from  brand where brand_id =?';
database_module.db.query(sql,[brand_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.brand_get_one = brand_get_one;


const brand_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into brand '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.brand_add = brand_add;


const brand_update = function(id,data,callback){
let sql = 'update brand set ? where brand_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.brand_update = brand_update;


const brand_delete = function(id,callback){
let sql = 'delete from brand where brand_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.brand_delete = brand_delete;


const brand_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from brand where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.brand_get_filter = brand_get_filter;


const brand_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from brand" +

filter+"\n" +

"group by brand_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.brand_get_filter_multi = brand_get_filter_multi;


let brand_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from brand";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.brand_count_page = brand_count_page;


let brand_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM brand \n" +
// "order by ? ?\n"+
" order by brand_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.brand_get_all_limit = brand_get_all_limit;



// --------------- module client


const brand_get_all_client = function(callback){

    let sql='SELECT b.*,COUNT(p.product_id) AS product_count from brand b\n' +
    'LEFT JOIN product p ON p.brand_id = b.brand_id\n' +
    'GROUP BY b.brand_id';
   database_module.db.query(sql,[], function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
};


exports.brand_get_all_client = brand_get_all_client;


