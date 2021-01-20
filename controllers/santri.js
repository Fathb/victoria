var firebase = require ('../firebase');
var db = firebase.database();
var santriRef = db.ref('santri/');

module.exports = {
  index: function (req, res) {
    santriRef.once('value', function(snap) {
      var santri = [];
      snap.forEach(childSnap=> {
        let dataSantri = childSnap.val();
        dataSantri.idx = childSnap.key;
        santri.push(dataSantri)
      })
      res.render('santri', {
        data: santri,
        title: 'data santri',
      })
    })
  },
  detail: function (req, res) {
    db.ref(req.url).once('value', function(snap) {
      var santri = snap.val();
      santri.idx = req.params.id
      res.render('detailsantri', {
        data: santri,
        title: 'detail santri'
      })
    })
  },
  hapus: function (req, res) {
    santriRef.child(req.params.id).remove();
    res.redirect('/santri');
  },
  edit: function (req, res) {
    var dataUpdate = req.body;
    santriRef.child(req.params.id).update(dataUpdate);
    res.redirect('/santri');
  },
  tambah: function (req, res) {
    var addData = req.body;
    santriRef.push(addData);
    res.redirect('/santri');
  },
  formTambah: function (req, res) {
    db.ref(req.url).once('value', function(snap) {
      var santri = snap.val();
      res.render('tambahdata', {
        title: 'tambah santri',
        btn: 'submit'
      })
    })
  }
}