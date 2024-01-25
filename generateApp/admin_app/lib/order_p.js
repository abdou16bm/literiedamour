const database_module=require('./database');

const order_p_get_all = function(callback){
 let sql='SELECT * from order_p order by product_id DESC ';
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_get_all = order_p_get_all;


const order_p_get_all_order = function(order_id,callback){
    let sql='SELECT * from order_p op\n' +
    'LEFT JOIN product p ON p.product_id = op.product_id\n' +
    'WHERE order_id = ?\n' +
    'order by op.product_id DESC';
   database_module.db.query(sql,[order_id], function (error, results, fields) {
   if (error) console.log('error : ',error);
   //console.log('results: ', results);
   if (callback){callback(error,results)};
   return results;
   });
   };


   exports.order_p_get_all_order = order_p_get_all_order;


const order_p_get_one = function(product_id,callback){
 let sql='SELECT * from  order_p where product_id =?';
database_module.db.query(sql,[product_id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_get_one = order_p_get_one;


const order_p_add = function(data,callback){
let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into order_p '+fields+' values ? ';
database_module.db.query(sql,[[values]], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_add = order_p_add;


const order_p_update = function(id,data,callback){
let sql = 'update order_p set ? where product_id =?';
database_module.db.query(sql,[data,id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_update = order_p_update;


const order_p_delete = function(id,callback){
let sql = 'delete from order_p where product_id =?';
database_module.db.query(sql,[id], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_delete = order_p_delete;


const order_p_get_filter = function (filter_field,filter_data,callback) {
let sql = "SELECT * from order_p where "+filter_field+ " like '%"+filter_data+"%'";
database_module.db.query(sql,[], function (error, results, fields) {
if (error) console.log('error : ',error);
//console.log('results: ', results);
if (callback){callback(error,results)};
return results;
});
};


exports.order_p_get_filter = order_p_get_filter;


const order_p_get_filter_multi = function (filter_field,callback) {
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
let sql = "select * from order_p" +

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


exports.order_p_get_filter_multi = order_p_get_filter_multi;


let order_p_count_page = function (limit,callback){
let sql ="select CEIL(count(*)/?) as 'count_p' from order_p";
database_module.db.query(sql,limit, function (error, results, fields) {
if (error) console.log('error : ',error);
// console.log('results: ', results);
if (callback){callback(error,results)};
return results;

});};
exports.order_p_count_page = order_p_count_page;


let order_p_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM order_p \n" +
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
exports.order_p_get_all_limit = order_p_get_all_limit;


let order_p_get_stats_product = function (callback){

    let sql ="SELECT p.product_id,p.product_name,op.product_price_o,SUM(op.product_qt_o) AS product_qt,SUM(op.product_price_o*op.product_qt_o) AS product_price FROM order_p op\n" +
    "INNER JOIN product p ON p.product_id = op.product_id\n" +
    "INNER JOIN order_stat os ON os.order_id = op.order_id\n" +
    "WHERE os.stat_id = 4\n" +
    "GROUP BY op.product_id\n" +
    "ORDER BY product_qt DESC\n" +
    "LIMIT 10";

    database_module.db.query(sql, function (error, results, fields) {

    if (error) console.log('error : ',error);

    // console.log('results: ', results);
    console.log('fields: ', fields);

    if (callback){callback(error,results)};

    return results;

    });
};

exports.order_p_get_stats_product = order_p_get_stats_product;



let order_p_get_stats_month = function (yearFilter,callback){

let sql = "SELECT m.*,\n"+
"IFNULL(m2.orderAtt_count,0) AS orderAtt_count,\n"+
"IFNULL(m2.orderAnn_count,0) AS orderAnn_count,\n"+
"IFNULL(m2.orderVal_count,0) AS orderVal_count,\n"+
"IFNULL(m2.orderRec_count,0) AS orderRec_count,\n"+
"IFNULL(m2.orderRet_count,0) AS orderRet_count,\n"+
"IFNULL(m2.orderTotal,0) AS orderTotal,\n"+
"IFNULL(m2.productQte,0) AS productQte,\n"+
"IFNULL(m2.totalPrice,0) AS totalPrice\n"+
"FROM (\n"+
"SELECT 1 AS monthId,'Janvier' AS 'monthName'\n"+
"UNION SELECT 2 AS monthId,'Février' AS 'monthName'\n"+
"UNION SELECT 3 AS monthId,'Mars' AS 'monthName'\n"+
"UNION SELECT 4 AS monthId,'Avril' AS 'monthName'\n"+
"UNION SELECT 5 AS monthId,'Mai' AS 'monthName'\n"+
"UNION SELECT 6 AS monthId,'Juin' AS 'monthName'\n"+
"UNION SELECT 7 AS monthId,'Juillet' AS 'monthName'\n"+
"UNION SELECT 8 AS monthId,'Août' AS 'monthName'\n"+
"UNION SELECT 9 AS monthId,'Septembre' AS 'monthName'\n"+
"UNION SELECT 10 AS monthId,'Octobre' AS 'monthName'\n"+
"UNION SELECT 11 AS monthId,'Nouvembre' AS 'monthName'\n"+
"UNION SELECT 12 AS monthId,'Décembre' AS 'monthName') m\n"+
"LEFT JOIN (\n"+
"SELECT\n"+
"MONTH(co.order_date) AS 'monthId',\n"+
"t1.orderAtt_count,\n"+
"t2.orderAnn_count,\n"+
"t3.orderVal_count,\n"+
"t4.orderRec_count,\n"+
"t5.orderRet_count,\n"+
"t6.orderTotal,\n"+
"t7.productQte,\n"+
"t7.totalPrice\n"+
"FROM customer_order co\n"+
"LEFT JOIN (\n"+
"SELECT MONTH(co.order_date) AS 'monthId',COUNT(MONTH(co.order_date)) AS orderAtt_count FROM customer_order co\n"+
"INNER JOIN order_stat os ON os.order_id = co.order_id\n"+
"WHERE os.stat_id = 1 AND YEAR(co.order_date) = " + yearFilter + "\n"+
"GROUP BY monthId\n"+
") t1 ON t1.monthId = MONTH(co.order_date)\n"+
"LEFT JOIN (\n"+
"SELECT MONTH(co.order_date) AS 'monthId',COUNT(MONTH(co.order_date)) AS orderAnn_count FROM customer_order co\n"+
"INNER JOIN order_stat os ON os.order_id = co.order_id\n"+
"WHERE os.stat_id = 2 AND YEAR(co.order_date) = " + yearFilter + "\n"+
"GROUP BY monthId\n"+
") t2 ON t2.monthId = MONTH(co.order_date)\n"+
"LEFT JOIN (\n"+
"SELECT MONTH(co.order_date) AS 'monthId',COUNT(MONTH(co.order_date)) AS orderVal_count FROM customer_order co\n"+
"INNER JOIN order_stat os ON os.order_id = co.order_id\n"+
"WHERE os.stat_id = 3 AND YEAR(co.order_date) = " + yearFilter + "\n"+
"GROUP BY monthId\n"+
") t3 ON t3.monthId = MONTH(co.order_date)\n"+
"LEFT JOIN (\n"+
"SELECT MONTH(co.order_date) AS 'monthId',COUNT(MONTH(co.order_date)) AS orderRec_count FROM customer_order co\n"+
"INNER JOIN order_stat os ON os.order_id = co.order_id\n"+
"WHERE os.stat_id = 4 AND YEAR(co.order_date) = " + yearFilter + "\n"+
"GROUP BY monthId\n"+
") t4 ON t4.monthId = MONTH(co.order_date)\n"+
"LEFT JOIN (\n"+
"SELECT MONTH(co.order_date) AS 'monthId',COUNT(MONTH(co.order_date)) AS orderRet_count FROM customer_order co\n"+
"INNER JOIN order_stat os ON os.order_id = co.order_id\n"+
"WHERE os.stat_id = 5 AND YEAR(co.order_date) = " + yearFilter + "\n"+
"GROUP BY monthId\n"+
") t5 ON t5.monthId = MONTH(co.order_date)\n"+
"LEFT JOIN (\n"+
"SELECT MONTH(co.order_date) AS 'monthId',COUNT(MONTH(co.order_date)) AS orderTotal FROM customer_order co\n"+
"INNER JOIN order_stat os ON os.order_id = co.order_id\n"+
"WHERE YEAR(co.order_date) = " + yearFilter + "\n"+
"GROUP BY monthId\n"+
") t6 ON t6.monthId = MONTH(co.order_date)\n"+
"LEFT JOIN (\n"+
"SELECT MONTH(co.order_date) AS monthId,COUNT(op.product_id) AS productQte,SUM(op.product_price_o*op.product_qt_o) AS totalPrice FROM customer_order co\n"+
"INNER JOIN order_stat os ON os.order_id = co.order_id\n"+
"INNER JOIN order_p op ON op.order_id = co.order_id\n"+
"WHERE YEAR(co.order_date) = " + yearFilter + " and os.stat_id = 4\n"+ 
"GROUP BY monthId\n"+
") t7  ON t7.monthId = MONTH(co.order_date)\n"+
"GROUP BY MONTH(co.order_date)\n"+
") m2 ON m2.monthId = m.monthId";

database_module.db.query(sql, function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});

};

exports.order_p_get_stats_month = order_p_get_stats_month;