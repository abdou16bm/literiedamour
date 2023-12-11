// MY MODULES
const brand_module = require ("../../admin_app/lib/brand")





const brand_list = function (req, res) {
   
    brand_module.brand_get_all_client(function (err,result1) {

        if (err) console.log(err)

        res.render('brands_list',{brands : result1, err : err, session : req.session});
        

    })

}



module.exports = {

    brand_list

}