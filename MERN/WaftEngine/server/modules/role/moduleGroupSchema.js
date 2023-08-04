const mongoose = require('mongoose');
const schema = mongoose.Schema;

const moduleGroupSchema = new schema({
  module_group: { type: String },
  description: { type: String },
  order: { type: Number },
  is_deleted: { type: Boolean, default: false }
});

module.exports = moduleGroup = mongoose.model('modulegroups', moduleGroupSchema);
