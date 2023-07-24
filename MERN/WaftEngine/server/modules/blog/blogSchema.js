const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
  title: { type: String },
  description: { type: String },
  short_description: { type: String },
  meta_tag: { type: [String] },
  meta_description: { type: String },
  summary: { type: String },
  tags: { type: [String] },
  author: [{ type: schema.Types.ObjectId, ref: 'users' }],
  keywords: { type: [String] },
  slug_url: { type: String },
  category: [{ type: schema.Types.ObjectId, ref: 'blogcat' }],
  published_on: { type: Date, default: Date.now },
  is_published: { type: Boolean, required: true, default: true },
  is_highlight: { type: Boolean, default: false },
  is_showcase: { type: Boolean, default: false },
  is_active: { type: Boolean, required: true, default: false },
  image: { type: schema.Types.ObjectId, ref: 'file' },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date, default: Date.now },
});

module.exports = Blog = mongoose.model('blog', blogSchema);
