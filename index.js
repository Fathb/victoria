const express = require('express');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const vhost = require('vhost')
const firebase = require('firebase')
const userRouter = require('./router/users')
const authRouter = require('./router/auth')
const midtransRouter = require('./router/midtransRouter')
const app = express()
const db = firebase.database()

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['hbs',
    'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(__dirname+'/assets', options))

app.use(bodyParser.urlencoded({
  extended: true
}));

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded
const port = 5001;
app.use(userRouter);
app.use(authRouter);
app.use(midtransRouter);

app.set ('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.get('/', function(req, res) {
  var title = 'victoria organizer';
  res.render('index', {
    title: title
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})