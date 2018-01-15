var mysql = require('mysql');

function createDBConnection (){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlroot',
    database: 'casadocodigo'
  });
};
//wrapper
module.exports = function(){
  return createDBConnection;
};