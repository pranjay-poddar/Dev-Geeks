const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactSchema = new schema({
  name: { type: String },
  email: { type: String },
  message: { type: String },
  subject: { type: String },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
  added_at: { type: Date, default: Date.now, required: false },
});
module.exports = Contact = mongoose.model('contact', contactSchema);
