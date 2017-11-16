const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  group_id: {
      type: String,
      unique: true
  },
  keyword_map: [
      {
          keyword: String,
          value: String
      }
    ]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;