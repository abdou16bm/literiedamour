const database_module=require('./database');

const sub_category_get_all = function(callback){
 let sql='SELECT sc.*, COUNT(p.product_id) AS product_count from sub_category sc\n' +
 'LEFT JOIN product p ON p.sub_cat_id = sc.sub_cat_id\n' +
 'GROUP BY sc.sub_cat_id\n' +
 'order by sc.sub_cat_id';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.sub_category_get_all = sub_category_get_all;


const sub_category_get_all_count = function(callback){
    let sql = 'select count(*) as sub_category_count from sub_category';
    database_module.db.query(sql,[], function (error, results, fields) {
    if (error) console.log('error : ',error);
    //console.log('results: ', results);
    if (callback){callback(error,results)};
    return results;
    });
    };


exports.sub_category_get_all_count = sub_category_get_all_count;


const sub_category_get_one = function(sub_cat_id,callback){
 let sql='SELECT * from  sub_category where sub_cat_id =?';
database_module.db.query(sql,[sub_cat_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.sub_category_get_one = sub_category_get_one;


const sub_category_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into sub_category '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.sub_category_add = sub_category_add;


const sub_category_update = function(id,data,callback){
let sql = 'update sub_category set ? where sub_cat_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.sub_category_update = sub_category_update;


const sub_category_delete = function(id,callback){
let sql = 'delete from sub_category where sub_cat_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.sub_category_delete = sub_category_delete;


const sub_category_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from sub_category where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.sub_category_get_filter = sub_category_get_filter;


const sub_category_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from sub_category" +

filter+"\n" +

"group by sub_cat_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.sub_category_get_filter_multi = sub_category_get_filter_multi;


let sub_category_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from sub_category";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.sub_category_count_page = sub_category_count_page;


let sub_category_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM sub_category \n" +
// "order by ? ?\n"+
" order by sub_cat_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.sub_category_get_all_limit = sub_category_get_all_limit;





//---------- module client


const sub_category_get_all_client = function(callback){
    let sql='SELECT sc.*,COUNT(p.product_id) AS product_count from sub_category sc\n' +
    'LEFT JOIN product p ON p.sub_cat_id = sc.sub_cat_id\n' +
    'GROUP BY sc.sub_cat_id';
   database_module.db.query(sql,[], function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
   };


exports.sub_category_get_all_client = sub_category_get_all_client;
