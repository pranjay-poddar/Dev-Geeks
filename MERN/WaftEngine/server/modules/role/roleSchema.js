const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolesSchema = new schema({
  role_title: { type: String},
  description: { type: String },
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, required: true, default: false },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
});

module.exports = Roles = mongoose.model('roles', rolesSchema);
