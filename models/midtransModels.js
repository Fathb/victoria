const midtransClient = require('midtrans-client');
// Create Core API / Snap instance (both have shared `transactions` methods)
let midtrans = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-_wwYdjjoX-LYG0XzAoP0Aovs',
  clientKey: 'SB-Mid-client-rcH3ZBqNDoUIwGnr'
});