const mysql = require('mysql2')
const dbCofig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "delivery",
  // timezone: "08:00:00"
}
const dbPool = {
  pool: {},
  create(){
    this.pool = mysql.createPool(dbCofig)
  },
  connect(sql, arr, callback){
    this.pool.getConnection(function(err, connection){
      connection.query(sql, arr, callback)
      connection.release()
    })
  }
  
}
dbPool.create()

module.exports = dbPool