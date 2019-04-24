const db = require('../db/db');
const mysql = require('mysql');
let connection = mysql.createConnection(db);

connection.connect();
let dbOperating = {
  queryAll: function(req, res, next) {
    connection.query('select * from recommendImg', function(err, rows, fields) {
      if (err) {
        console.log(err);
        return;
      };
      res.send(rows);
    });
  }
}

module.exports = dbOperating;
