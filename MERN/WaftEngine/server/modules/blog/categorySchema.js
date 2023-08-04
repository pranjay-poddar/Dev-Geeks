const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
  title: { type: String },
  description: { type: String },
  image: { type: schema.Types.ObjectId, ref: 'file' },
  slug_url: { type: String },
  is_active: { type: Boolean, required: true, default: true },
  order: { type: Number },
  is_deleted: { type: Boolean, default: false, },
  deleted_at: { type: Date },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
});

module.exports = blogCat = mongoose.model('blogcat', categorySchema);
