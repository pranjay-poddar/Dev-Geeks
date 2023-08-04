const utils = {};
utils.recursiveChildFinder = (parentArray = [], allChildren = []) => {
  const baseWithChildren = parentArray.map(each => {
    const child_menu = allChildren.filter(child => '' + child.parent_menu === '' + each._id) || [];
    return { ...each, child_menu };
  });
  let baseParentIds = [];
  baseWithChildren.map(eachBase => {
    baseParentIds = [...baseParentIds, ...eachBase.child_menu.map(each => '' + each._id)];
  });
  if (baseParentIds.length === 0) {
    return baseWithChildren;
  }
  return baseWithChildren.map(each => ({
    ...each,
    child_menu: utils.recursiveChildFinder(each.child_menu, allChildren),
  }));
};

module.exports = utils;
