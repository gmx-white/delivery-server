const moment = require('moment')
const date_status = require('./datamap')

function dataFormat(dateString){
  return moment(dateString).format('YYYY-MM-DD HH:mm:ss');
}

function isUpdate(body) {
  let flag = false;
  for (let key of Object.keys(body)){
    if(body[key]) {
      flag = true
      break
    }
  }
  return flag
}
function editSqlCom(body) {
  
  let sql = 'update record set'
  date_status.map(item => {
    // 设置时间
    if (body[item.date_name]) {
      sql += ` ${item.date_name}='${dataFormat(body[item.date_name])}',`
      // 必须设置状态，没传给默认0
      if (body[item.status_name]) {
        sql += ` ${item.status_name}=${body[item.status_name]},`
      } else {
        sql += ` ${item.status_name}=0,`
      }
    }
    // 单独设置状态
    if (body[item.status_name]) {
      sql += ` ${item.status_name}=${body[item.status_name]},`
    }
  })
  // 设置当前状态
  if(body.status) {
    sql += ` status=${body.status},`
  }
  if(body.money) sql += ` money=${body.money}`
  // 避免sql语句出错
  if(sql.charAt(sql.length-1) === ',') sql = sql.substring(0, sql.length-1)
  sql += ` where record_id=${body.record_id};`
  return sql
}

module.exports = {dataFormat, editSqlCom, isUpdate}