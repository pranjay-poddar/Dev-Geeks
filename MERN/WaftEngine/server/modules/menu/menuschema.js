const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  title: { type: String },
  parent_menu: { type: Schema.Types.ObjectId, ref: 'menu_item' },
  parent_hierarchy: [{ type: Schema.Types.ObjectId, ref: 'menu_item' }],
  is_internal: { type: Boolean, required: true, default: true },
  url: { type: String },
  is_active: { type: Boolean, default: true, required: true },
  is_deleted: { type: Boolean, required: true, default: false },
  target: { type: String, enum: ['_blank', '_self', '_parent', '_top'], default: '_self' },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: Schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date },
  menu_sch_id: { type: Schema.Types.ObjectId, ref: 'menusch' },
});

const menuSchema = new Schema({
  title: { type: String },
  key: { type: String },
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, required: true, default: false },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: Schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date },
});
const menuSch = mongoose.model('menusch', menuSchema);
const menu_item = mongoose.model('menu_item', menuItemSchema);
module.exports = { menuSch, menu_item };
