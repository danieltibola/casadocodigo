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
  else if(process.env.NODE_ENV === 'production'){
    var urlConn = process.env.CLEARDB_DATABASE_URL;
    var grupos = urlConn.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
    return mysql.createConnection({
      host: grupos[3],
      user: grupos[1],
      password: grupos[2],
      database: grupos[4]
    });
  }
};
//wrapper
module.exports = function(){
  return createDBConnection;
};