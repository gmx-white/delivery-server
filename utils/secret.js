const secretKey = 'gmx-white'
const jwt = require('jsonwebtoken')
function genToken(info, expires='1day'){
  return jwt.sign(info, secretKey, {expiresIn: expires})
}
function checkToken(token){
  
}
module.exports={
  secretKey, genToken
} 