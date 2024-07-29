const mysql = require('mysql');

let connection = mysql.createConnection({

    host: 'localhost',
     // user: 'literiedamour_user1',
     // password: 'p2N[~lH!HreJ',
     // database: 'literiedamour_ecom_literiedamour',
   user: 'root',
   password: '',
   database: 'ecom_literiedamour',
    multipleStatements: true,
    timezone: 'utc'
});

connection.connect();
db = connection;

db.query("SET @@sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'");

exports.db = db;
