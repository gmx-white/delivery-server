const express = require('express')
const router = express.Router()
const recordCtrl = require('../controller/recordCtrl.js')

router.post('/record', recordCtrl.getRecordList)
router.put('/edit', recordCtrl.editRecord)
router.post('/desc', recordCtrl.updateDesc)
router.delete('/delete', recordCtrl.deleteRecord)
router.post('/add', recordCtrl.addRecord)

module.exports = router