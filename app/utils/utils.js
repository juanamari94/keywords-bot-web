const crypto = require("crypto");
const hash = crypto.createHash('sha256');

module.exports = {
  hashKey: function(key) {
   hash.update(key, 'utf-8');
   return hash.digest('hex');
  }
};