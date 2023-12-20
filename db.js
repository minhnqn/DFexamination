const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'infomation_storm'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("OK");
});

module.exports = connection;
