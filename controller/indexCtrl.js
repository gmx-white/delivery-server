const indexDao = require('../dao/indexDao')
function login(req, resp) {
  let username = req.body.username
  let password = req.body.pwd
  let checkUserSql = "select * from userinfo where username=?"
  let checkLoginSql = checkUserSql + " and pwd=?"
  let userArr = [username, password]
  indexDao.loginCheck(checkLoginSql,checkUserSql, userArr, function(err, data){
    if(!err) resp.send(data)
  })
}
function checkUsername (req, resp){
  let username = req.query.username
  let sql = 'select * from userinfo where username = ?'
  indexDao.checkuser(sql, [username], function(err,data){
    if(data){
      resp.send({
        msg: data.length > 0 ? "用户已经存在" : "可注册账号",
        status: data.length > 0 ? 101 : 200
      })
    }
  })
}

function registerIn (req, resp) {
  const {username, pwd} = req.body
  let sql = 'insert into userinfo(username, pwd) value(?, ?)'
  indexDao.checkuser(sql, [username, pwd], function (err, data){
    if(data){
      resp.send({
        msg: "注册成功",
        status: 200
      })
    } else {
      resp.send({
        msg: "注册失败",
        status: 400
      })
    }
  })
}

module.exports = {
  login, checkUsername, registerIn
}