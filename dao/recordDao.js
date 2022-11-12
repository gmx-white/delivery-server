const dbPool = require('../config/db.config')


function getRecordDB (sql, arr, callback){
  dbPool.connect(sql, arr, function(err, data){
      callback(err, data)
  })
}
function editRecordDB (sql, arr, callback) {
  dbPool.connect(sql, arr, function(err, data){
    callback(err, data)
  })
}
function updateDescDB (sql, arr, callback) {
  dbPool.connect(sql, arr, function(err, data){
    callback(err, data)
  })
}
function deleteRecordDB (sql, arr, callback) {
  dbPool.connect(sql, arr, function(err, data){
    callback(err, data)
  })
}
function addRecordDB (sql, arr, callback) {
  
  dbPool.connect(sql, arr, function(err, data){
    callback(err, data)
  })
}


module.exports = {getRecordDB, editRecordDB, updateDescDB, deleteRecordDB, addRecordDB}