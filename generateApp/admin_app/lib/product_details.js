const database_module=require('./database');

const product_details_get_all = function(callback){ 
 let sql='SELECT * from product_details order by product_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_details_get_all = product_details_get_all;


const product_details_get_all_product = function(id,callback){ 
    let sql='SELECT * FROM product_details pd\n' +
    'left join details d on d.detail_id = pd.detail_id \n' +
    'WHERE pd.product_id = ?\n' +
    'ORDER BY pd.product_id';
   database_module.db.query(sql,[id], function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
   };
   
   
exports.product_details_get_all_product = product_details_get_all_product;


const product_details_get_one = function(product_id,detail_id,callback){ 
 let sql='SELECT * from  product_details where product_id =? and detail_id = ?';
database_module.db.query(sql,[product_id,detail_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_details_get_one = product_details_get_one;


const product_details_add = function(data,callback){ 
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into product_details '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_details_add = product_details_add;


const product_details_update = function(product_id,detail_id,data,callback){ 
let sql = 'update product_details set ? where product_id =? and detail_id = ?';
database_module.db.query(sql,[data,product_id,detail_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_details_update = product_details_update;


const product_details_delete = function(product_id,detail_id,callback){ 
let sql = 'delete from product_details where product_id =? and detail_id = ?';
database_module.db.query(sql,[product_id,detail_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_details_delete = product_details_delete;


const product_details_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from product_details where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.product_details_get_filter = product_details_get_filter;


const product_details_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from product_details" +

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


exports.product_details_get_filter_multi = product_details_get_filter_multi;


let product_details_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from product_details";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.product_details_count_page = product_details_count_page;


let product_details_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM product_details \n" +
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
exports.product_details_get_all_limit = product_details_get_all_limit;




//------------ product details client-------


const product_details_get_all_product_client = function(id,callback){ 
    let sql='SELECT * FROM product_details pd\n' +
    'left join details d on d.detail_id = pd.detail_id \n' +
    'WHERE pd.product_id = ?\n' +
    'ORDER BY pd.product_id';
   database_module.db.query(sql,[id], function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
   };
   
   
exports.product_details_get_all_product_client = product_details_get_all_product_client;

