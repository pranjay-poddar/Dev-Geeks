const mongoose = require('mongoose');
const schema = mongoose.Schema;

const loginLogSchema = new schema({
  login_date: { type: Date, required: true, default: Date.now },
  expires_in: { type: Date },
  logout_date: { type: Date },
  ip_address: { type: String },
  device_info: { type: String },
  browser_info: { type: String },
  is_active: { type: Boolean, required: true, default: true },
  token: { type: String, required: true },
  user_id: { type: schema.Types.ObjectId, required: true, ref: 'users' },
});

module.exports = loginlogs = mongoose.model('loginlogs', loginLogSchema);
