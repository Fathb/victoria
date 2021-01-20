const express = require ('express')
const router = express.Router()

const authCtl = require('../controllers/auth')



router.route('/registrasi')
.get(authCtl.formReg)
.post(authCtl.reg);
router.route('/login')
.get(authCtl.formLogin)
.post(authCtl.login);
router.route('/logout')
.get(authCtl.logout)
// router.get('/users/:id', usersCtl.update)
// router.get('/users/:id', usersCtl.delete)

module.exports = router