const httpStatus = require('http-status');

const { menuSch, menu_item } = require('./menuschema');
const otherHelper = require('../../helper/others.helper');
const menuConfig = require('./menuConfig');
const utils = require('./utils');
const menuController = {};
const menuItemController = {};

menuController.getMenu = async (req, res, next) => {
  let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
  searchQuery = { is_deleted: false };
  if (req.query.find_title) {
    searchQuery = { title: { $regex: req.query.find_title, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_key) {
    searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
  }

  selectQuery = 'title key order is_active';
  let data = await otherHelper.getQuerySendResponse(menuSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'Menu get success!', page, size, data.totalData);
};

const menuControl = async (req, res, next) => {
  const all_menu = await menu_item.find({ menu_sch_id: req.body.menu_sch_id, is_deleted: false }).sort({ order: 1 }).lean();
  const baseParents = [];
  const baseChildren = [];
  all_menu.forEach((each) => {
    if (each.parent_menu == null) {
      baseParents.push(each);
    } else {
      baseChildren.push(each);
    }
  });

  const child = utils.recursiveChildFinder(baseParents, baseChildren);
  return child;
};
menuItemController.getMenuItem = async (req, res, next) => {
  try {
    const menu = await menu_item.findById(req.params.id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, menu, null, menuConfig.get, null);
  } catch (err) {
    next(err);
  }
};
menuItemController.deleteMenuItem = async (req, res, next) => {
  try {
    const menuId = req.params.id;
    const menu = await menu_item.findByIdAndUpdate(
      menuId,
      {
        $set: { is_deleted: true },
      },
      { new: true },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, menu, null, menuConfig.delete, null);
  } catch (err) {
    next(err);
  }
};
menuItemController.saveMenuItem = async (req, res, next) => {
  try {
    let menuitem = req.body;

    if (menuitem.parent_menu) {
      const hierarchy = await menu_item.findById(menuitem.parent_menu).select('parent_hierarchy').lean();

      menuitem.parent_hierarchy = [...hierarchy.parent_hierarchy, hierarchy._id];
    }

    if (menuitem && menuitem._id) {
      menuitem.updated_at = new Date();
      menuitem.updated_by = req.user.id;

      const isLoop = otherHelper.mongoIdExistInArray(menuitem.parent_hierarchy, menuitem._id);
      if (isLoop) {
        const errors = { parent_menu: 'Circular Dependencies detected' };
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Invalid Call', null);
      }

      const update = await menu_item.findByIdAndUpdate(
        menuitem._id,
        {
          $set: menuitem,
        },
        { new: true },
      );
      const child = await menuControl(req, res, next);
      return otherHelper.sendResponse(res, httpStatus.OK, true, child, null, menuConfig.save, null);
    } else {
      menuitem.added_at = new Date();
      menuitem.added_by = req.user.id;
      const newMenuItem = new menu_item(menuitem);
      const menu_item_save = await newMenuItem.save();
    }
    const child = await menuControl(req, res, next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, child, null, menuConfig.save, null);
  } catch (err) {
    next(err);
  }
};

menuController.saveMenu = async (req, res, next) => {
  try {
    let menu = req.body;
    if (menu && menu._id) {
      menu.updated_by = req.user.id;
      menu.updated_at = new Date();
      const update = await menuSch.findByIdAndUpdate(menu._id, { $set: menu }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, menuConfig.save, null);
    } else {
      menu.added_by = req.user.id;
      menu.added_at = new Date();
      const newMenu = new menuSch(menu);
      const MenuSave = await newMenu.save();
      // const data = await menuControl(req, res, next);
      return otherHelper.sendResponse(res, httpStatus.OK, true, MenuSave, null, menuConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};

menuController.getEditMenu = async (req, res, next) => {
  const id = await otherHelper.returnIdIfSlug(req.params.id, 'key', menuSch);
  if (!id) {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, 'Menu not found', null);
  }
  const parent = await menuSch.findById(id).select('title key order is_active');
  if (parent) {
    const all_menu = await menu_item.find({ menu_sch_id: parent._id, is_deleted: false }).sort({ order: 1 }).lean();
    const baseParents = [];
    const baseChildren = [];
    all_menu.forEach((each) => {
      if (each.parent_menu == null) {
        baseParents.push(each);
      } else {
        baseChildren.push(each);
      }
    });
    const child = utils.recursiveChildFinder(baseParents, baseChildren);

    return otherHelper.sendResponse(res, httpStatus.OK, true, { parent, child }, null, 'Child menu get success!', null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Not Found', null);
  }
};

menuController.deleteMenu = async (req, res, next) => {
  const menuId = req.params.id;
  const menu = await menuSch.findByIdAndUpdate(
    menuId,
    {
      $set: { is_deleted: true, key: '' },
    },
    { new: true },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, menu, null, menuConfig.delete, null);
};

menuController.getMenuForUser = async (req, res, next) => {
  const id = await menuSch.findOne({ key: req.params.key, is_active: true }).select('key');
  const baseParents = [];
  const baseChildren = [];
  let key = req.params.key;
  if (id && id._id) {
    key = id.key;
    const all_menu = await menu_item.find({ menu_sch_id: id._id, is_deleted: false }).sort({ order: 1 }).lean();
    all_menu.forEach((each) => {
      if (each.parent_menu == null) {
        baseParents.push(each);
      } else {
        baseChildren.push(each);
      }
    });
  }
  const child = utils.recursiveChildFinder(baseParents, baseChildren);
  return otherHelper.sendResponse(res, httpStatus.OK, true, { child, key: key }, null, 'Child menu get success!', null);
};

menuController.selectMultipleData = async (req, res, next) => {
  const { menu_item_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await menuSch.updateMany({ _id: { $in: menu_item_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await menuSch.updateMany(
      { _id: { $in: menu_item_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};

module.exports = { menuController, menuItemController };
