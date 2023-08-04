const mongoose = require('mongoose');
const schema = mongoose.Schema;

const metaSchema = new schema({
  client_route: { type: String },
  title: { type: String },
  meta_description: { type: String },
  meta_keywords: { type: String },
  meta_image: { type: schema.Types.Mixed },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
});

module.exports = meta = mongoose.model('meta', metaSchema);
