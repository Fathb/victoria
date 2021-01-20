const crypto = require('crypto');

module.exports = {
  getHashedPassword: function(password) {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
  },
  generateAuthToken: function(a) {
    return crypto.randomBytes(a).toString('hex');
  },
  getRndInt: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}