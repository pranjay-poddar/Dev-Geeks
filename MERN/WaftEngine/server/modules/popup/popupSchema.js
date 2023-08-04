const mongoose = require('mongoose');
const schema = mongoose.Schema;

const popupSchema = new schema({
  title: { type: String, required: true },
  key: { type: String, /* required: true, unique: true */ },
  display_target:{type: String ,enum:["popup_in_slider","one_by_one","homepage_only","overall_page","according_to_date"]},
  start_date: { type: Date },
  end_date: { type: Date },
  template:{type:String,enum:["single_image","use_slider","show_img_one_by_one","ck_editor"],/* default:"single_image" */},
  templateRequirement:[{
  image:{type:schema.Types.ObjectId,ref:'file'},
  start_date: { type: Date },
  end_date: { type: Date },
  link: { type: String, required: false },
  caption:{ type: String, required: false},
  description: { type: schema.Types.Mixed},

  }],
  is_active: { type: Boolean, default: false },
  is_deleted: { type: Boolean,  default: false },
  is_removal:{type:Boolean,default:true},
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
});

module.exports = popup = mongoose.model('popup', popupSchema);
