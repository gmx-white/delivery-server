const express = require("express");
const logger = require("morgan");
const { expressjwt: expressJwt } = require("express-jwt");
const {secretKey} = require("./utils/secret");
const indexRouter = require("./routes/indexRouter");
const recordRouter = require("./routes/recordRouter");
const {checkUser} = require('./utils/middleware')
const app = express();

// 日志模块
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 静态文件
app.use(express.static(__dirname + "/src"));

//设置允许跨域访问该服务.
//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// JWT鉴权
app.use(
  expressJwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/user\//],
  })
);

// 路由
app.use("/user", indexRouter);
app.use("/list", [checkUser], recordRouter);

// 错误处理
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }

  res.send({
    status: 500,
    message: "未知的错误",
  });
});

app.listen(1009, function () {
  console.log("Express Server is running at 1009");
});
