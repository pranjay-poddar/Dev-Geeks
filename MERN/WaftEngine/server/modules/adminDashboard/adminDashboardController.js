const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const apiCallHelper = require('../../helper/apicall.helper');
const userSch = require('./../user/userSchema');
const bugSch = require('./../bug/bugSchema');
const roleSch = require('./../role/roleSchema');
const blogSch = require('./../blog/blogSchema');

const adminDashboardController = {};

adminDashboardController.getNoOfCustomerByRegistration = async (req, res, next) => {
  try {
    const data = await userSch.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: `$register_method`,
          amt: { $sum: 1 },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getWaftEngineInfo = async (req, res, next) => {
  try {
    const d = await apiCallHelper.requestThirdPartyApi(req, 'https://waftengine.org/api/documentation/latestinfo', {}, {}, 'GET', next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, d.data, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.GetErrorsGroupBy = async (req, res, next) => {
  try {
    const bugs = await bugSch.aggregate([{ $group: { _id: '$error_type', count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
    let totalData = 0;
    bugs.forEach((each) => {
      totalData = totalData + each.count;
    });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, bugs, 'errors by group by get success!', 1, 1, totalData);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getLastXDayUserRegistration = async (req, res, next) => {
  try {
    const days = req.params.day;
    var d = new Date();
    d.setDate(d.getDate() - days);
    const data = await userSch.aggregate([
      {
        $match: {
          added_at: { $gte: d },
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$added_at' },
            day: { $dayOfMonth: '$added_at' },
            year: { $year: '$added_at' },
          },
          amt: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.rm': 1 },
      },
      { $project: { _id: '$_id.year', month: '$_id.month', day: '$_id.day', rm: '$_id.rm', amt: '$amt' } },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getLatestFiveUsers = async (req, res, next) => {
  try {
    let top = 5;
    top = Number.parseInt(top);
    const fiveUsers = await userSch.find({ is_deleted: false }).select('name email image').sort({ _id: -1 }).limit(top);
    return otherHelper.sendResponse(res, httpStatus.OK, true, fiveUsers, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.getNoOfBlogByBlogWriter = async (req, res, next) => {
  try {
    const data = await blogSch.aggregate([
      { $unwind: '$author' },
      {
        $group: { _id: '$author', amt: { $sum: 1 } },
      },
      {
        $sort: { amt: -1 },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $project: { author: '$author.name', amt: '$amt' } },
      { $unwind: '$author' },
    ]);
    const count = await blogSch.countDocuments();
    return otherHelper.sendResponse(res, httpStatus.OK, true, { blog: data, count: count }, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

adminDashboardController.GetAllUserGroupBy = async (req, res, next) => {
  try {
    let role = await roleSch.find({ is_deleted: false }).select('role_title').lean();
    let totalData = await userSch.countDocuments({ is_deleted: false });
    for (var j = 0; j < role.length; j++) {
      role[j].count = await userSch.countDocuments({ roles: { $in: [role[j]._id] }, is_deleted: false });
    }
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, { role }, 'users by group by get success!', 1, 1, totalData);
  } catch (err) {
    next(err);
  }
};

module.exports = adminDashboardController;
