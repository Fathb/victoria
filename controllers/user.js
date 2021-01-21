const midtransClient = require('midtrans-client');
const helper = require ('../helper/authhelper');
var firebase = require ('../firebase');
var db = firebase.database();

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-_wwYdjjoX-LYG0XzAoP0Aovs',
  clientKey: 'SB-Mid-client-rcH3ZBqNDoUIwGnr'
});
let clientKey = snap.apiConfig.clientKey;

module.exports = {
  index: function (req, res) {
    const user = req.cookies.AuthToken;
    if (user) {
      res.render('user/users', {
        status: true,
        data: user,
        method: req.method,
        url: req.url,
        title: 'User Dashboard'
      })
    } else {
      res.render('auth/login', {
        message: 'login dulu',
        messageClass: ' alert-danger'
      })
    }
  },

  topup: function (req, res) {
    const user = req.cookies.AuthToken;
    const id = helper.getRndInt(1, 999999)
    let parameter = {
      "transaction_details": {
        "order_id": id,
        "gross_amount": req.body.ak_deposit
      },
      "item_details": {
        "id": "ITEM1",
        "price": req.body.ak_deposit,
        "quantity": 1,
        "name": "TopUp",
        "merchant_name": "Victoria"
      },
      "credit_card": {
        "secure": true
      },
      "customer_details": {
        "first_name": user.nama,
        "email": user.contact
      }
    };
    snap.createTransaction(parameter)
    .then((transaction)=> {
      var dataOrder = {
        order_id: parameter.transaction_details.order_id,
        gross_amount: parameter.transaction_details.gross_amount,
        nama_barang: parameter.item_details.name,
        status: "transaction has not been created",
        client: parameter.customer_details,
        va_number: {
          va_number: "still null"
        },
        token: transaction.token,
        order_created: Date.now(),
        uid: user.key
      };
      db.ref('transaction/'+dataOrder.order_id)
      .update(dataOrder);
    });
    res.redirect('/topup');
  },

  topupView: function (req, res) {
    const user = req.cookies.AuthToken;
    if (user) {
      db.ref('transaction')
      .orderByChild('client/email')
      .equalTo(user.contact)
      .on('value', snap => {
        const dataTrx = [];
        snap.forEach(key => {
          dataTrx.push(key.val());
        });
        res.render('user/topup', {
          key: clientKey,
          data: user,
          dataTrx,
          title: 'top up page',
          url: req.headers.host
        });
      });
    } else {
      res.render('auth/login', {
        message: 'login dulu',
        messageClass: ' alert-danger'
      })
    }
  },
  bayarTopUp: function (req, res) {
    console.log(req.params);
    console.log(req.headers.host);
    res.render('user/bayar', {
      key: clientKey,
      token: req.params.token
    })
  }
}