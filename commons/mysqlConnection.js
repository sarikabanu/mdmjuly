var mysql = require('mysql2');
setconfig = require('../config/setconfig');
setconfig.setConf(false);

var pool = mysql.createPool({
    host            :  setconfig.properties.mysqlConnection.host,
    user            :  setconfig.properties.mysqlConnection.user,
    password        :  setconfig.properties.mysqlConnection.password,
    database        :  setconfig.properties.mysqlConnection.database,
    connectionLimit : 100
});

this.releaseConnection = function(conn){
   conn.release();

  }
exports.pool = pool;
