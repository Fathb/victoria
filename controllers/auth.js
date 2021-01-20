var firebase = require ('../firebase');
var db = firebase.database();
const helper = require ('../helper/authhelper');

module.exports = {
  formReg: function(req, res) {
    res.render('auth/registrasi')
  },
  reg: function(req, res) {
    var data = {
      nama: req.body.nama,
      tim: req.body.tim,
      contact: req.body.contact,
      password: helper.getHashedPassword(req.body.password)
    }
    db.ref('users').once('value', (snap)=> {
      var users = [];
      snap.forEach(child=> {
        var a = child.val();
        a.key = child.key;
        users.push(a);
      });
      if (users.find(user => user.contact === data.contact)) {

        res.render('auth/registrasi', {
          message: data.contact+' already registered.',
          messageClass: ' alert-danger'
        });
      } else {
        db.ref('users').push(data);
        res.render('auth/registrasi', {
          message: data.nama+' success registered.',
          messageClass: ' alert-success'
        })
      }
      users = [];
    })

  },
  formLogin: function(req, res) {
    const user = req.cookies.AuthToken;
    if (user) {
      res.redirect('/dashboard')
    } else {
      res.render('auth/login')
    }
  },
  login: function (req, res) {
    const {
      email,
      password
    } = req.body;
    const hashedPassword = helper.getHashedPassword(password);
    db.ref('users').once('value')
    .then((snapshot)=> {
      var users = [];
      snapshot.forEach((u)=> {
        var a = u.val();
        a.key = u.key;
        users.push(a);
      });
      const user = users.find(u => {
        return u.contact === email && hashedPassword === u.password
      });

      if (user) {
        const authToken = helper.generateAuthToken(30);

        // Store authentication token
        var authTokens = [];
        authTokens[authToken] = user;

        // Setting the auth token in cookies
        res.cookie('AuthToken', authTokens[authToken]);
        // Redirect user to the protected page
        res.redirect('/dashboard?key='+user.key);
      } else {
        res.render('auth/login', {
          message: 'Invalid username or password',
          messageClass: ' alert-danger'
        });
      }
    })
  },
  logout: function(req, res) {
    res.clearCookie('AuthToken');
    res.redirect('/');
  }
}