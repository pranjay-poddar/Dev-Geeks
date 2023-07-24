const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const sliderSch = require('./sliderSchema');
const sliderConfig = require('./sliderConfig');
const sliderController = {};

sliderController.GetSlider = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = [
      {
        path: 'images.image',
        select: '_id path mimetype filename size',
      },
    ];
    if (req.query.find_slider_name) {
      searchQuery = {
        slider_name: {
          $regex: req.query.find_slider_name,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_slider_key) {
      searchQuery = {
        slider_key: {
          $regex: req.query.find_slider_key,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let sliders = await otherHelper.getQuerySendResponse(sliderSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, sliders.data, sliderConfig.get, page, size, sliders.totalData);
  } catch (err) {
    next(err);
  }
};
sliderController.SaveSlider = async (req, res, next) => {
  try {
    const slider = req.body;
    let d = new Date();
    slider.slug_url = otherHelper.slugify(`${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${slider.slider_key}`);
    if (slider && slider._id) {
      const update = await sliderSch.findByIdAndUpdate(slider._id, {
        $set: slider,
      });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, sliderConfig.save, null);
    } else {
      slider.added_by = req.user.id;
      const newSlider = new sliderSch(slider);
      const slidersave = await newSlider.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, slidersave, null, sliderConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
sliderController.GetSliderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let populate = [
      {
        path: 'images.image',
        select: '_id path mimetype filename size',
      },
    ];
    const slider = await sliderSch
      .findOne({
        _id: id,
        is_deleted: false,
      })
      .populate(populate);
    return otherHelper.sendResponse(res, httpStatus.OK, true, slider, null, sliderConfig.get, null);
  } catch (err) {
    next(err);
  }
};
sliderController.GetSliderByKey = async (req, res, next) => {
  const id = req.params.key;
  let selectq = { added_by: 0, added_at: 0 };
  const slider = await sliderSch
    .findOne(
      {
        slider_key: id,
        is_deleted: false,
      },
      selectq,
    )
    .populate('images.image');
  return otherHelper.sendResponse(res, httpStatus.OK, true, slider, null, sliderConfig.get, null);
};
sliderController.DeleteSlider = async (req, res, next) => {
  const id = req.params.id;
  const sliderDel = await sliderSch.findOneAndUpdate(
    { _id: id, is_removal: true },
    {
      $set: {
        is_deleted: true,
        deleted_at: Date.now,
      },
    },
  );
  if (sliderDel && sliderDel._id) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, sliderDel, null, sliderConfig.delete, null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'cannot delete', 'cannot delete', null);
  }
};
module.exports = sliderController;
