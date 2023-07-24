const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sliderSchema = new schema({
  slider_name: { type: String },
  slider_key: { type: String },
  slug_url: { type: String },
  class_name: { type: String },
  images: [
    {
      image: { type: schema.Types.ObjectId, ref: 'file' },
      caption: { type: String },
      caption_position: { type: String },
      link: { type: String },
    },
  ],
  slider_setting: {
    arrows: { type: Boolean, default: true },
    // arrow_position: { type: String, default: true },
    dots: { type: Boolean, default: true },
    // dot_position: { type: String, default: true },
    slidesPerRow: { type: Number, default: 1, max: 6, min: 1 },
    slidesToScroll: { type: Number },
    slidesToShow: { type: Number },
    centerMode: { type: Boolean, default: false },
    autoplay: { type: Boolean, default: true },
    autoplaySpeed: { type: Number },
    focusOnSelect: { type: Boolean, default: true },
  },
  settings: { type: schema.Types.Mixed },
  is_removal: { type: Boolean, default: true },
  is_deleted: { type: Boolean, required: true, default: false },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
});
module.exports = Slider = mongoose.model('slider', sliderSchema);
