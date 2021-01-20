// var express = require('express')
var firebase = require ('../firebase');
var db = firebase.database();

module.exports = {
  getNotif: (req, res)=> {
    var data = {
      status: req.body.transaction_status,
      status_code: req.body.status_code,
      va_number: req.body.va_numbers[0]
    };
    db.ref('transaction/'+req.body.order_id).update(data);
    res.send('notifications:'+req.body+'received');
  },
  getUser: (req, res)=> {
    res.send(req.cookies)
  },
  storeTrx: (req, res)=> {
    var data = {
      va_number: req.body.va_numbers,
      status: req.body.transaction_status
    }
    db.ref('transaction/'+req.body.order_id).update(data);
    res.end();
  }
};