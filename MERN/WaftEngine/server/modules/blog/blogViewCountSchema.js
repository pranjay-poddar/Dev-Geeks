const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const { slugify } = require('../../helper/others.helper');

const blogViewCountSchema = new schema({
  blog_id: { type: schema.Types.ObjectId, ref: 'blog' },
  date: { type: Date },
  count: { type: Number },
});

module.exports = Blog = mongoose.model('blogviewcount', blogViewCountSchema);
