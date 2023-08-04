const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contentSchema = new schema({
  name: { type: String },
  key: { type: String },
  description: { type: String },
  image: { type: schema.Types.ObjectId, ref: 'file' },
  publish_from: { type: Date },
  publish_to: { type: Date },
  meta_tag: { type: [String] },
  meta_description: { type: String },
  meta_title: { type: String },
  is_active: { type: Boolean, required: true, default: false },
  is_page: { type: Boolean, required: true, default: false },
  is_deleted: { type: Boolean, required: true, default: false },
  is_removal: { type: Boolean, default: true },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
});

module.exports = Content = mongoose.model('content', contentSchema);
