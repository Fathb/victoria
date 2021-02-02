const express = require ('express')
const router = express.Router()

const usersCtl = require('../controllers/user')



router.route('/dashboard')
.get(usersCtl.index)
// router.get('/users/:id', usersCtl.update)
router.route('/topup')
.get(usersCtl.topupView)
.post(usersCtl.topup)

router.route('/topup/:token')
.get(usersCtl.bayarTopUp)
.post(usersCtl.hapusTrx)


module.exports = router