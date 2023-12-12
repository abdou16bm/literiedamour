const nodemailer = require('nodemailer');


//exemple modulemail.sentmail_all('reservation@hotelbaydiab-dz.com','b0VI!sg6','pro.icosnethosting.com',465,true
const sentmail_all = function (userAuth,passAuth,hostAuth,portAuth,secureAuth,title, to, subject, text,html,callback) {

    if ( userAuth == 0 || passAuth == 0) {

        console.log('is nulllllll')

        var transporter = nodemailer.createTransport({
            host: 'pro.icosnethosting.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'reservation@hotelbaydiab-dz.com',
                pass: 'b0VI!sg6'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: title + '<'+'reservation@hotelbaydiab-dz.com'+'>',
            to: to,
            bcc: 'reservation@hotelbaydiab-dz.com',
            subject: subject,
            text: text,
            html : html
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
    else {

        console.log('is not nulllllll')

        var transporter = nodemailer.createTransport({
            host: hostAuth,
            port: portAuth,
            secure: secureAuth, // true for 465, false for other ports
            auth: {
                user: userAuth,
                pass: passAuth
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: title + '<' + userAuth + '>',
            to: to,
            bcc: 'reservation@hotelbaydiab-dz.com',
            subject: subject,
            text: text,
            html : html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }

            if (callback) {
                callback(error, info)
            }

            return info;
        })
    }

}

exports.sentmail_all = sentmail_all;
