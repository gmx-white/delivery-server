const jwt = require('jsonwebtoken');
const { secretKey } = require("./secret");
exports.checkUser = (req, res, next) => {
  console.log("检查用户登录情况");
  let token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log("invalid");
        return;
      }
      // console.log(decoded);
      req.username = decoded.username
    });
    next()
  } else {
    res.send({
      msg: "未登录",
      status: 403,
    });
  }
};


