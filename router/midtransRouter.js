const express = require ('express')
const router = express.Router()
const midtransCtl = require('../controllers/midtransCtl')



router.route('/midtrans')
.get(midtransCtl.getUser)
.post(midtransCtl.getNotif)
.put(midtransCtl.storeTrx)

module.exports = router