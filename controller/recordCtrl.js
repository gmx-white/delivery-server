const recordDao = require("../dao/recordDao");
const { dataFormat, isUpdate, editSqlCom } = require("../utils/dataFormat");

function getRecordList(req, resp) {
  var sql =
    "select r.* from record r left join userinfo u on r.user_id = u.u_id where u.username=?";
  let getRarr = [];
  getRarr.push(req.username);
  let totalSql;

  if (req.body.c_name) {
    sql = sql + " and r.company like '%" + req.body.c_name + "%'";
  }
  if (req.body.start_date) {
    sql += " and datediff(r.date, ?)";
    getRarr.push(req.body.start_date);
  }
  if (req.body.end_date) {
    sql += " and datediff(?, r.date)";
    getRarr.push(req.body.end_date);
  }
  if (req.body.status && req.body.status != 0) {
    sql += " and r.status= ?";
    getRarr.push(req.body.status);
  }

  if (req.body.sort_type) {
    sql += ` order by r.${req.body.sort_type} ${
      req.body.up == 1 ? "asc" : "desc"
    }`;
  }
  totalSql = sql;
  sql += ` limit ${req.body.pagesize ? req.body.pagesize : 10}`;
  sql += ` offset ${
    req.body.pagesize ? (req.body.pagenum - 1) * Number(req.body.pagesize) : 0
  }`;

  recordDao.getRecordDB(sql, getRarr, function (err, data) {
    console.log(err, data);
    if (data) {
      recordDao.getRecordDB(totalSql, getRarr, function (err, total) {
        if (total) {
          resp.send({
            data,
            total: total.length,
            msg: "ok",
            status: 200,
          });
        }
      });
    } else {
      resp.send({
        msg: "获取失败",
        status: 400,
      });
    }
  });
}
function editRecord(req, resp) {
  // console.log(req.body, "edit params");
  const { body } = req;
  if (!isUpdate(body)) {
    resp.send({
      msg: "没有更新",
      status: 200,
    });
    return;
  }
  let sql = editSqlCom(body);
  recordDao.editRecordDB(sql, [], function (err, data) {
    if (data) {
      resp.send({
        msg: "insert ok",
        status: 200,
      });
    } else {
      resp.send({
        msg: "insert failed",
        status: 500,
      });
    }
  });
}

function updateDesc(req, resp) {
  const { body } = req;
  let sql = "update record set ??=? where record_id=?";
  let updateArr = [body.desc_name, body.desc, body.record_id];
  recordDao.updateDescDB(sql, updateArr, function (err, data) {
    if (data) {
      resp.send({
        msg: "修改备注成功",
        status: 200,
      });
    } else {
      resp.send({
        msg: "error",
        status: 500,
      });
    }
  });
}

function deleteRecord(req, resp) {
  const record_id = req.query.record_id;
  let sql = "delete from record where record_id=?";
  recordDao.deleteRecordDB(sql, [record_id], function (err, data) {
    if (data) {
      resp.send({
        msg: "删除成功",
        status: 200,
      });
    } else {
      resp.send({
        msg: "删除失败",
        status: 500,
      });
    }
  });
}

function addRecord(req, resp) {
  const { body } = req;
  if (!body.company || !body.date) {
    resp.send({
      msg: "缺少必要参数",
      status: 100,
    });
    return;
  }
  let findIdSql = "select * from userinfo where username=?";

  let sql =
    "insert into record(user_id, company_name,  office, station, date, city, status) value(?, ?, ?, ?, ?, ?, ?)";
  const { company, office, station, date, city } = body;
  recordDao.addRecordDB(findIdSql, [req.username], function (err, data) {
    if (data && data.length > 0) {
      let user_id = data[0].u_id;
      recordDao.addRecordDB(
        sql,
        [user_id, company, office, station, date, city],
        function (err, data) {
          if (data) {
            resp.send({
              msg: "新建成功",
              status: 200,
            });
          } else {
            resp.send({
              msg: "新建失败",
              status: 500,
            });
          }
        }
      );
    }
  });
}

module.exports = {
  getRecordList,
  editRecord,
  updateDesc,
  deleteRecord,
  addRecord,
};
