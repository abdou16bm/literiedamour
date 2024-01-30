const database_module=require('./database');

const delivery_price_get_all = function(callback){
 let sql='SELECT * from delivery_price order by wilaya_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.delivery_price_get_all = delivery_price_get_all;





const delivery_price_get_all_wilaya = function(shop_id,callback){
    let sql='SELECT w1.wilaya_id,w1.wilaya_name,p1.price_home,p2.price_relay FROM wilaya w1\n' +
    'LEFT JOIN (\n' +
    'SELECT w2.wilaya_id,delivery_price AS price_home FROM wilaya w2\n' +
    'INNER JOIN  delivery_price dp ON dp.wilaya_id = w2.wilaya_id\n' +
    'WHERE dp.shop_id = ? AND dp.delivery_type_id = 1) p1 ON w1.wilaya_id = p1.wilaya_id\n' +
    'LEFT JOIN (\n' +
    'SELECT w2.wilaya_id,delivery_price AS price_relay FROM wilaya w2\n' +
    'INNER JOIN  delivery_price dp ON dp.wilaya_id = w2.wilaya_id\n' +
    'WHERE dp.shop_id = ? AND dp.delivery_type_id = 2) p2 ON w1.wilaya_id = p2.wilaya_id\n' +
    'order BY w1.wilaya_id';
   database_module.db.query(sql,[shop_id,shop_id], function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
   };


   exports.delivery_price_get_all_wilaya = delivery_price_get_all_wilaya;


const delivery_price_get_one = function(wilaya_id,callback){
 let sql='SELECT * from  delivery_price where wilaya_id =?';
database_module.db.query(sql,[wilaya_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.delivery_price_get_one = delivery_price_get_one;


const delivery_price_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into delivery_price '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.delivery_price_add = delivery_price_add;


const delivery_add_one = function (wilaya,shop,type,data,callback) {

    let sql = 'delete from delivery_price where wilaya_id = ? AND shop_id = ? AND delivery_type_id = ?;\n'+
    'insert into delivery_price set ? ';

    database_module.db.query(sql,[wilaya,shop,type,data], function (error, results, fields) {
        if (error) console.log('error : ',error);

        if (callback){callback(error,results)};

        return results;
    });

};

exports.delivery_add_one = delivery_add_one

const delivery_price_update = function(id,data,callback){
let sql = 'update delivery_price set ? where wilaya_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.delivery_price_update = delivery_price_update;


const delivery_price_delete = function(id,callback){
let sql = 'delete from delivery_price where wilaya_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.delivery_price_delete = delivery_price_delete;


const delivery_price_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from delivery_price where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.delivery_price_get_filter = delivery_price_get_filter;


const delivery_price_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from delivery_price" +

filter+"\n" +

"group by wilaya_id"

// console.log('sql',sql)

database_module.db.query(sql,filter, function (error, results, fields) {

if (error) console.log('error : ',error);

//console.log('results: ', results);

if (callback){callback(error,results)};

return results;
});
};


exports.delivery_price_get_filter_multi = delivery_price_get_filter_multi;


let delivery_price_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from delivery_price";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.delivery_price_count_page = delivery_price_count_page;


let delivery_price_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM delivery_price \n" +
// "order by ? ?\n"+
" order by wilaya_id DESC \n"+
"LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.delivery_price_get_all_limit = delivery_price_get_all_limit;



//------- modules client---------


const delivery_price_get_one_client = function (wilaya,type,callback) {

    let sql = "SELECT * FROM delivery_price\n" +
    "WHERE shop_id = 1 AND wilaya_id = ? AND delivery_type_id = ?";

    database_module.db.query(sql,[wilaya,type], function (error, results, fields) {
        if (error) console.log('error : ',error);

        if (callback){callback(error,results)};

        return results;
    });

};

exports.delivery_price_get_one_client = delivery_price_get_one_client;
