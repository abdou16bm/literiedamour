const nodemailer = require('nodemailer');


//exemple modulemail.sentmail_all('reservation@hotelbaydiab-dz.com','b0VI!sg6','pro.icosnethosting.com',465,true
const send_mail = function (to,subject,text,html,Company,callback) {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'testmailer.ghano@gmail.com',
            pass: 'evuntpvsflpaytmn'
        },
    });

    var mailOptions = {
        from: "'"+Company+"' <testmailer.ghano@gmail.com>",
        to: to,
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }

        if (callback){callback(error,info)};

        return info;
    })  

}


exports.send_mail = send_mail