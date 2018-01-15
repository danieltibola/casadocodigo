var mysql = require('mysql');

function createDBConnection (){
  if(!process.env.NODE_ENV){
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysqlroot',
      database: 'casadocodigo'
    });
  }
  else if(process.env.NODE_ENV === 'test'){
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysqlroot',
      database: 'casadocodigo_teste'
    });
  }
};
//wrapper
module.exports = function(){
  return createDBConnection;
};