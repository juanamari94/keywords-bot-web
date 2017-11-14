const crypto = require("crypto");

module.exports = {
  hashKey: function(key) {
    const hash = crypto.createHash('sha256');
    hash.update(key, 'utf-8');
    return hash.digest('hex');
  }
};