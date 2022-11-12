const dbPool = require('../config/db.config')
const {genToken} = require('../utils/secret')

function loginCheck(checkLoginSql, checkUserSql, arr, callback) {
  dbPool.connect(checkUserSql, [arr[0]], function(err, data){
    if(data && data.length > 0){
      dbPool.connect(checkLoginSql, arr, function(err,data) {
        // console.log(err, data);
        if(data && data.length > 0){
        const token = genToken({username: arr[0]})
          callback(err, {
            msg: "合法用户",
            token,
            status: 200
          })
        } else {
          callback(err, {
            msg: "密码不正确",
            status: 102
          })
        }
      })
    } else {
      callback(err, {msg: "用户不存在",
      status: 101})
    }
  })
}

function checkuser (sql, arr, callback) {
  dbPool.connect(sql, arr, function(err, data){
    callback(err, data)
  })
}

module.exports = {
  loginCheck, checkuser
}