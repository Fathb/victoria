const express = require ('express')
const router = express.Router()

const santriCtl = require('../controllers/santri')



router.route('/santri')
.get(santriCtl.index)
.post(santriCtl.tambah)
router.route('/santri/:id')
.get(santriCtl.detail)
.post(santriCtl.edit)
router.get('/hapussantri/:id', santriCtl.hapus)
router.route('/formTambah')
.get(santriCtl.formTambah)
.post(santriCtl.tambah)

module.exports = router