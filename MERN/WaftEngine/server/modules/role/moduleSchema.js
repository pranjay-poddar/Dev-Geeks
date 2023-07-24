const mongoose = require('mongoose');
const schema = mongoose.Schema;

const moduleSchema = new schema({
  module_name: { type: String },
  description: { type: String },
  is_deleted: { type: Boolean, default: false },
  order: { type: Number },
  module_group: { type: schema.Types.ObjectId, path: 'moduleGroup' },
  path: [
    {
      access_type: { type: String, required: true },
      access_type_description: { type: String },
      admin_routes: [{ type: String, required: true }],
      server_routes: [{
        route: { type: String, required: true },
        method: { type: String, require: true }
      }],
    },
  ],
});

module.exports = Access = mongoose.model('moduleAccess', moduleSchema);
