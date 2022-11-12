const express = require('express')
const userCtrl = require("../controller/indexCtrl.js")
const router = express.Router()


router.post('/login', userCtrl.login)
router.get('/check', userCtrl.checkUsername)
router.post('/register', userCtrl.registerIn)
module.exports = router