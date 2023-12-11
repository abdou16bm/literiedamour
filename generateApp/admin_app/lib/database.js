const mysql = require('mysql');

let connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecom_literiedamour',
    multipleStatements: true,
    timezone: 'utc'
});

connection.connect();
db = connection;
exports.db = db;

