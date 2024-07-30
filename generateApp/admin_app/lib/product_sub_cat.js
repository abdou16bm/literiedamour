const database_module=require('./database');

const product_sub_cat_get_all = function(callback){
 let sql='SELECT * from product_sub_cat order by product_id DESC ';
 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_sub_cat_get_all = product_sub_cat_get_all;


const product_sub_cat_get_one = function(product_id,sub_cat_id,callback){
 let sql="SELECT * from  product_sub_cat\n" +
     "inner join sub_category on sub_category.sub_cat_id = product_sub_cat.sub_cat_id\n" +
     "where product_sub_cat.product_id =? and product_sub_cat.sub_cat_id =?\n" ;
 database_module.db.query(sql,[product_id,sub_cat_id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_sub_cat_get_one = product_sub_cat_get_one;


const product_sub_cat_add = function(data,callback){
 let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into product_sub_cat '+fields+' values ? ';
 database_module.db.query(sql,[[values]], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_sub_cat_add = product_sub_cat_add;


const product_sub_cat_update = function(id,data,callback){
 let sql = 'update product_sub_cat set ? where product_id =?';
 database_module.db.query(sql,[data,id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_sub_cat_update = product_sub_cat_update;


const product_sub_cat_delete = function(id,callback){
 let sql = 'delete from product_sub_cat where product_id =?';
 database_module.db.query(sql,[id], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_sub_cat_delete = product_sub_cat_delete;


const product_sub_cat_get_filter = function (filter_field,filter_data,callback) {
 let sql = "SELECT * from product_sub_cat where "+filter_field+ " like '%"+filter_data+"%'";
 database_module.db.query(sql,[], function (error, results, fields) {
  if (error) console.log('error : ',error);
//console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;
 });
};


exports.product_sub_cat_get_filter = product_sub_cat_get_filter;


const product_sub_cat_get_filter_multi = function (filter_field,callback) {
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
 let sql = "select * from product_sub_cat" +

filter+"\n" +

"group by product_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.product_sub_cat_get_filter_multi = product_sub_cat_get_filter_multi;


let product_sub_cat_count_page = function (limit,callback){
 let sql ="select CEIL(count(*)/?) as 'count_p' from product_sub_cat";
 database_module.db.query(sql,limit, function (error, results, fields) {
  if (error) console.log('error : ',error);
// console.log('results: ', results);
  if (callback){callback(error,results)};
  return results;

});};
exports.product_sub_cat_count_page = product_sub_cat_count_page;


let product_sub_cat_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM product_sub_cat \n" +
    // "order by ? ?\n"+
    " order by product_id DESC \n"+
    "LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
 console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.product_sub_cat_get_all_limit = product_sub_cat_get_all_limit;


