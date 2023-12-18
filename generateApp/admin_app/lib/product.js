const database_module=require('./database');

const product_get_all = function(callback){
    let sql='SELECT * from product\n' +
        'LEFT JOIN brand ON brand.brand_id = product.brand_id\n' +
        'LEFT JOIN shop ON shop.shop_id = product.shop_id\n' +
        'LEFT JOIN sub_category sc ON sc.sub_cat_id = product.sub_cat_id\n' +
        'order by product_id DESC ';
    database_module.db.query(sql,[], function (error, results, fields) {
        if (error) console.log('error : ',error);
//console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_get_all = product_get_all;


const product_get_all_top = function(top,callback){
   
    let sql='SELECT * from product\n' +
    'LEFT JOIN brand ON brand.brand_id = product.brand_id\n' +
    'LEFT JOIN shop ON shop.shop_id = product.shop_id\n' +
    'LEFT JOIN sub_category sc ON sc.sub_cat_id = product.sub_cat_id\n' +
    'order by product_id DESC limit ?';
   
    database_module.db.query(sql,[top], function (error, results, fields) {
    if (error) console.log('error : ',error);
    if (callback){callback(error,results)};
    return results;
    });
};


exports.product_get_all_top = product_get_all_top;

const product_get_one = function(product_id,callback){
    let sql='SELECT * FROM product\n' +
        'LEFT JOIN sub_category sc ON sc.sub_cat_id = product.sub_cat_id\n' +
        'LEFT JOIN brand ON brand.brand_id = product.brand_id\n' +
        'WHERE product_id = ?';
    database_module.db.query(sql,[product_id], function (error, results, fields) {
        if (error) console.log('error : ',error);
//console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_get_one = product_get_one;


const product_get_all_count = function(callback){
    let sql = 'select count(*) as products_count from product';
    database_module.db.query(sql,[], function (error, results, fields) {
        if (error) console.log('error : ',error);
        //console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_get_all_count = product_get_all_count;


const product_add = function(data,callback){
    let fields = '('+Object.keys(data).toString()+')';

let values = Object.values(data);

let sql = 'insert into product '+fields+' values ? ';
    database_module.db.query(sql,[[values]], function (error, results, fields) {
        if (error) console.log('error : ',error);
//console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_add = product_add;


const product_update = function(id,data,callback){
    let sql = 'update product set ? where product_id =?';
    database_module.db.query(sql,[data,id], function (error, results, fields) {
        if (error) console.log('error : ',error);
//console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_update = product_update;


const product_delete = function(id,callback){
    let sql = 'delete from product where product_id =?';
    database_module.db.query(sql,[id], function (error, results, fields) {
        if (error) console.log('error : ',error);
//console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_delete = product_delete;


const product_get_filter = function (filter_field,filter_data,callback) {
    let sql = "SELECT * from product where "+filter_field+ " like '%"+filter_data+"%'";
    database_module.db.query(sql,[], function (error, results, fields) {
        if (error) console.log('error : ',error);
//console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_get_filter = product_get_filter;


const product_get_filter_multi = function (filter_field,callback) {
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
    let sql = "select * from product" +

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


exports.product_get_filter_multi = product_get_filter_multi;


let product_count_page = function (limit,callback){
    let sql ="select CEIL(count(*)/?) as 'count_p' from product";
    database_module.db.query(sql,limit, function (error, results, fields) {
        if (error) console.log('error : ',error);
// console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;

});};
exports.product_count_page = product_count_page;


let product_get_all_limit = function (limit1,limit2,order_value,order_type,callback){

let sql =" SELECT * FROM product \n" +
    // "order by ? ?\n"+
    " order by product_id DESC \n"+
    "LIMIT ?,?";

database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

if (error) console.log('error : ',error);

// console.log('results: ', results);
//console.log('fields: ', fields);

if (callback){callback(error,results)};

return results;

});
};
exports.product_get_all_limit = product_get_all_limit;




//------------- module client


const product_get_all_client = function(sub_cat,callback){

    let sql='SELECT * from product p\n' +
        'LEFT JOIN brand ON brand.brand_id = p.brand_id\n' +
        'LEFT JOIN sub_category sc ON sc.sub_cat_id = p.sub_cat_id\n' +
        'WHERE p.sub_cat_id = ?\n' +
        'order by product_id DESC LIMIT 12';
    database_module.db.query(sql,[sub_cat], function (error, results, fields) {
        if (error) console.log('error : ',error);
        //console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });

};


exports.product_get_all_client = product_get_all_client;



const product_get_one_client = function(product_id,callback){
    let sql='SELECT * FROM product\n' +
        'LEFT JOIN sub_category sc ON sc.sub_cat_id = product.sub_cat_id\n' +
        'LEFT JOIN brand ON brand.brand_id = product.brand_id\n' +
        'WHERE product_id = ?';
    database_module.db.query(sql,[product_id], function (error, results, fields) {
        if (error) console.log('error : ',error);
        //console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_get_one_client = product_get_one_client;



let product_count_page_filter = function (filterObj,limit,callback){

    let filter = ""

    if (typeof(filterObj.cat) != 'undefined' && filterObj.cat != null && filterObj.cat != "") {

        filter += " and sub_cat_id in (" + filterObj.cat + ")"

    }
    if (
        typeof(filterObj.bprice) != 'undefined' && filterObj.bprice != null && filterObj.bprice != ""
        && typeof(filterObj.eprice) != 'undefined' && filterObj.eprice != null && filterObj.eprice != ""
    ) {

        filter += " and product_price between " + filterObj.bprice + " and " + filterObj.eprice

    }
    if (typeof(filterObj.brand) != 'undefined' && filterObj.brand != null && filterObj.brand != "") {

        filter += " and brand_id in (" + filterObj.brand + ")"

    }
    if (typeof(filterObj.product) != 'undefined' && filterObj.product != null && filterObj.product != "") {

        filter += " and product_name like '%"+filterObj.product+"%'"

    }


    let sql ="select CEIL(count(*)/?) as 'count_p' from product\n" +
        "where shop_id = 1\n"
        + filter;

    //console.log(sql)
    database_module.db.query(sql,limit, function (error, results, fields) {
        if (error) console.log('error : ',error);
        // console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;

    });};
exports.product_count_page_filter = product_count_page_filter;




let product_get_all_limit_filter = function (filterObj,limit1,limit2,order_value,order_type,callback){

    let filter = ""

    if (typeof(filterObj.catP) != 'undefined' && filterObj.catP != null && filterObj.catP != "") {

        filter += " and category.cat_id in (" + filterObj.catP + ")"

    }

    if (typeof(filterObj.cat) != 'undefined' && filterObj.cat != null && filterObj.cat != "") {

        filter += " and sub_category.sub_cat_id in (" + filterObj.cat + ")"

    }
    if (
        typeof(filterObj.bprice) != 'undefined' && filterObj.bprice != null && filterObj.bprice != ""
        && typeof(filterObj.eprice) != 'undefined' && filterObj.eprice != null && filterObj.eprice != ""
    ) {

        filter += " and product_price between " + filterObj.bprice + " and " + filterObj.eprice

    }
    if (typeof(filterObj.brand) != 'undefined' && filterObj.brand != null && filterObj.brand != "") {

        filter += " and brand_id in (" + filterObj.brand + ")"

    }
    if (typeof(filterObj.product) != 'undefined' && filterObj.product != null && filterObj.product != "") {

        filter += " and product_name like '%"+filterObj.product+"%'"

    }


    let sql =" SELECT * FROM product \n" +
        "left join sub_category on sub_category.sub_cat_id = product.sub_cat_id\n" +
        "left join category on category.cat_id = sub_category.cat_id\n" +
        "where shop_id = 1\n"
        +filter+"\n" +
        // "order by ? ?\n"+
        " order by product_id DESC \n"+
        "LIMIT ?,?";

    database_module.db.query(sql, [limit1,limit2], function (error, results, fields) {

        if (error) console.log('error : ',error);

        // console.log('results: ', results);
        //console.log('fields: ', fields);

        if (callback){callback(error,results)};

        return results;

    });
};
exports.product_get_all_limit_filter = product_get_all_limit_filter;




const product_get_all_sub_category_brand = function(subcat,brand,callback){
    let sql='SELECT * from product\n' +
        'LEFT JOIN brand ON brand.brand_id = product.brand_id\n' +
        'LEFT JOIN shop ON shop.shop_id = product.shop_id\n' +
        'LEFT JOIN sub_category sc ON sc.sub_cat_id = product.sub_cat_id\n' +
        'where product.sub_cat_id = ? and product.brand_id = ?\n' +
        'order by product_id DESC ';
    database_module.db.query(sql,[subcat,brand], function (error, results, fields) {
        if (error) console.log('error : ',error);
        //console.log('results: ', results);
        if (callback){callback(error,results)};
        return results;
    });
};


exports.product_get_all_sub_category_brand = product_get_all_sub_category_brand;
