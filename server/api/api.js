const db = require('../db/db');
const mysql = require('mysql');
let connection = mysql.createConnection(db);

connection.connect();
let dbOperating = {
  selectRecommendImg: function(req, res, next) {
    connection.query('select * from recommendImg', function(err, rows, fields) {
      if (err) {
        console.log(err);
        return;
      };
      res.send(rows);
    });
    //connection.end();
  },
  selectMenu: function(req,res,next) {
  	connection.query('select * from menu', function(err, rows, fields) {
      if (err) {
        console.log(err);
        return;
      };
      res.send(rows);
    });
    //connection.end();
  }
}

module.exports = dbOperating;
