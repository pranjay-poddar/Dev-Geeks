const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accessSchema = new schema({
  module_id: { type: schema.Types.ObjectId, required: true, ref: 'moduleAccess' },
  role_id: { type: schema.Types.ObjectId, required: true, ref: 'roles' },
  access_type: [{ type: [schema.Types.ObjectId], required: true }],
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, default: false },
  added_at: { type: Date, default: Date.now },
});

module.exports = Access = mongoose.model('access', accessSchema);
