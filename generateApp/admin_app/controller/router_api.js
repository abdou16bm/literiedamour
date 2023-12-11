const fs = require('fs');
const formidable = require('formidable');
const doc_module = require("../lib/doc");
const user_module = require("../lib/user");
const product_module = require('../lib/product');


const upload_profil_pic = function (req,res){
    const id = req.session.userid;
    user_module.user_get_one(id, function (err, result1) {
        if (err) console.log('error', err);
        if (req.baseUrl == "/api") {
            res.send({ user: result1, err: err, session : req.session});
        } else {
            res.render('profil_pic_upload', { user: result1, err: err, session : req.session});
        }
    });
}



const upload_profil_pic_save = function (req,res){

    const options = {
        // multiples: true,
        uploadDir: './client/uploads'
    };

    const form = formidable({ uploadDir:  `${__dirname}/../uploads` });

    form.parse(req, (err, fields, files) => {
        console.log('fields:', fields);
        console.log('files:', files);
    });
}




const upload_content = function (req,res){
    const id = req.session.userid;
    /*    const options = {
        multiples: true,
        uploadDir: './client/uploads'
    };

    let form = new formidable.IncomingForm(options);*/
    const form = formidable({ uploadDir:  `${__dirname}/../uploads` });

    form.parse(req, function (err, fields, files) {


        let input = fields;

        // let id = fields.user;
        console.log('fields',fields)
        console.log('files',files)

        doc_module.uploadFile('./admin_app/public/img/user/', id, files, 'uploadImg', 'profil', 'jpg', function (err, count1) {

            if (err) console.log(err)

            // console.log('count1 : ', count1)

            /*let Input = Object.keys(files)[0];
            let Input_file = files[Input];

            console.log('files',files)
            // console.log('Input',Input)
            // console.log('files uploadImg',files[Input]) // OR files.uploadImg
            // console.log('files keys',Object.keys(files))
            // console.log('files keys0',)


            /!*main content data*!/
            var oldpath1 = Input_file.path;
            var newpath1 = dir+'/'+Input_file.name;

            console.log('oldpath1',oldpath1)
            console.log('newpath1',newpath1)
*/

            // fs.mkdir(dir, function (err) {

            // if (err) console.log(err);


            // });


        });
        if (req.baseUrl == "/api") {
            res.send({err: err, session: req.session });
        } else {
            res.redirect('/agence/profile');
        }
    });
}

const remove_content = function (req,res){
    const {id,pic} = req.body;
    let dir = './admin_app/public/img/product/'+id;
    let file = dir+'/'+pic;
    doc_module.remove_file(dir,file, function (err, files_count) {
        if (err) console.log('error', err);
        product_module.product_update(id,{product_imgcount:files_count},function (err,result){
            res.send({ files_count: files_count, err: err, session : req.session});
        })

    });
}


exports.upload_content = upload_content;
exports.upload_profil_pic = upload_profil_pic;
exports.upload_profil_pic_save = upload_profil_pic_save;
exports.remove_content = remove_content;
