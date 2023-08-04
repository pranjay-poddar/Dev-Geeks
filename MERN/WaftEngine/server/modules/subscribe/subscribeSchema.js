const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subscribeSchema = new schema({
  email: { type: String },
  is_subscribed: { type: Boolean, default: false },
  added_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
});

module.exports = Subscribe = mongoose.model('subscribe', subscribeSchema);
