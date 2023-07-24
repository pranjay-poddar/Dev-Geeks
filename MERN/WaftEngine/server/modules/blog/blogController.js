const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const blogConfig = require('./blogConfig');
const blogSch = require('./blogSchema');
const blogViewCountSch = require('./blogViewCountSchema');
const blogCatSch = require('./categorySchema');
const moment = require('moment');
const blogController = {};
const objectId = require('mongoose').Types.ObjectId;

blogController.GetBlogAuthorize = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = [
      {
        path: 'author',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'image',
        select: 'path',
      },
    ];
    selectQuery = 'title summary tags author short_description meta_tag meta-description category keywords slug_url is_published published_on is_active image added_by added_at updated_at updated_by is_highlight is_showcase';
    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_category) {
      searchQuery = { ...searchQuery, category: req.query.find_category };
    }
    if (req.query.find_author) {
      searchQuery = { ...searchQuery, author: req.query.find_author };
    }
    if (req.query.find_is_published) {
      searchQuery = { ...searchQuery, is_published: req.query.find_is_published };
    }
    if (req.query.find_is_highlight) {
      searchQuery = { ...searchQuery, is_highlight: req.query.find_is_highlight };
    }
    if (req.query.find_is_active) {
      searchQuery = { ...searchQuery, is_active: req.query.find_is_active };
    }
    if (req.query.find_is_showcase) {
      searchQuery = { ...searchQuery, is_showcase: req.query.find_is_showcase };
    }
    if (req.query.find_published_on && !(req.query.find_published_on == 'Invalid date')) {
      const date_old = new Date(req.query.find_published_on);
      const date_one = new Date(date_old.getTime() + 86400000);
      searchQuery = {
        published_on: { $gte: date_old, $lte: date_one },
        ...searchQuery,
      };
    }
    let blogs = await otherHelper.getQuerySendResponse(blogSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    let published = await blogSch.countDocuments({ is_published: true, is_deleted: false });
    let active = await blogSch.countDocuments({ is_active: true, is_deleted: false });
    let highlight = await blogSch.countDocuments({ is_highlight: true, is_deleted: false });
    let showcase = await blogSch.countDocuments({ is_showcase: true, is_deleted: false });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, { published, active, highlight, showcase }, page, size, blogs.totalData);
  } catch (err) {
    next(err);
  }
};
blogController.getLatestBlog = async (req, res, next) => {
  try {
    const current_date = new Date();
    const data = await blogSch
      .find({ is_active: true, is_deleted: false, is_published: true, published_on: { $lte: current_date } })
      .populate([
        {
          path: 'author',
          select: '_id name',
        },
        {
          path: 'image',
          select: 'path',
        },
      ])
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1 })
      .sort({ published_on: -1 })
      .skip(0)
      .limit(5);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest Blog get success!', null);
  } catch (err) {
    next(err);
  }
};
blogController.getShowcaseBlog = async (req, res, next) => {
  try {
    const current_date = new Date();
    const data = await blogSch
      .find({ is_active: true, is_deleted: false, is_published: true, is_showcase: true, published_on: { $lte: current_date } })
      .populate([
        {
          path: 'author',
          select: '_id name',
        },
        {
          path: 'image',
          select: 'path',
        },
      ])
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1, published_on: 1, short_description: 1 })
      .sort({ published_on: -1 })
      .skip(0)
      .limit(5);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest Blog get success!', null);
  } catch (err) {
    next(err);
  }
};

blogController.selectMultipleDataBlog = async (req, res, next) => {
  const { blog_id, type } = req.body;

  if (type == 'is_published') {
    const Data = await blogSch.updateMany({ _id: { $in: blog_id } }, [
      {
        $set: {
          is_published: { $not: '$is_published' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else if (type == 'is_active') {
    const Data = await blogSch.updateMany({ _id: { $in: blog_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await blogSch.updateMany(
      { _id: { $in: blog_id } },
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

blogController.selectMultipleDataCat = async (req, res, next) => {
  const { blog_category_id, type } = req.body;
  if (type == 'is_active') {
    const Data = await blogCatSch.updateMany({ _id: { $in: blog_category_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await blogCatSch.updateMany(
      { _id: { $in: blog_category_id } },
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

blogController.getTrendingBlog = async (req, res, next) => {
  try {
    const trendblog_ids = await blogViewCountSch.aggregate([
      {
        $match: {
          date: { $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: '$blog_id',
          sum: { $sum: '$count' },
        },
      },
      { $sort: { sum: -1 } },
      { $limit: 7 },
    ]);
    let ids = [];
    for (let i = 0; i < trendblog_ids.length; i++) {
      ids = trendblog_ids[i]._id;
    }
    const current_date = new Date();
    const data = await blogSch
      .find({ is_active: true, is_deleted: false, is_published: true, _id: { $in: trendblog_ids }, published_on: { $lte: current_date } })
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1 })
      .sort({ published_on: -1 })
      .skip(0)
      .limit(6);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Trending Blog get success!', null);
  } catch (err) {
    next(err);
  }
};

blogController.getLatestBlogByCat = async (req, res, next) => {
  try {
    const size_default = 10;
    let size;
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    const cat_id = req.params.cat_id;
    const category = await blogCatSch.findById(cat_id).select({ title: 1, slug_url: 1 });
    const current_date = new Date();
    const blogs = await blogSch
      .find({ is_active: true, is_deleted: false, category: cat_id, is_published: true, published_on: { $lte: current_date } })
      .select({
        short_description: 1,
        slug_url: 1,
        title: 1,
        added_at: 1,
        image: 1,
        category: 1,
        author: 1,
      })
      .populate([
        { path: 'category', select: 'title' },
        { path: 'author', select: 'name' },
        {
          path: 'image',
          select: 'path',
        },
      ])
      .sort({ _id: -1 })
      .skip(0)
      .limit(size * 1);
    const totalData = blogs.length;
    return otherHelper.sendResponse(res, httpStatus.OK, true, { blogs, category, totalData }, null, 'Latest blogs by category', null);
  } catch (err) {
    next(err);
  }
};
blogController.getRelatedBlog = async (req, res, next) => {
  try {
    const slug = req.params.slug_url;
    const current_date = new Date();
    let filter = { is_deleted: false, is_active: true, is_published: true, published_on: { $lte: current_date } };
    let slug_filter = { slug_url: slug };
    let slug_not_filter = { slug_url: { $ne: slug } };
    if (objectId.isValid(slug)) {
      filter._id = slug;
      slug_filter = { _id: slug };
      slug_not_filter = { _id: { $ne: objectId(slug) } };
    } else {
      filter.slug_url = slug;
    }
    const tages = await blogSch.findOne(filter).select('tags meta_tag category keywords');

    let f = [];
    if (tages) {
      let d = [''];
      d = [...tages.meta_tag, ...tages.keywords, ...tages.tags];
      for (let i = 0; i < d.length; i++) {
        f.push({ tags: d[i] });
      }
    }
    let filter_final = {
      is_active: true,
      is_deleted: false,
      is_published: true,
      published_on: { $lte: current_date },
      ...slug_not_filter,
    };
    if (f && f.length) {
      filter_final = { ...filter_final, $or: f };
    } else if (tages && tages.category) {
      filter_final = { ...filter_final, $or: [{ category: tages.category }] };
    }
    const data = await blogSch.find(filter_final).select({ slug_url: 1, title: 1, added_at: 1, image: 1 }).sort({ published_on: -1 }).skip(0).limit(3);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest Blog', null);
  } catch (err) {
    next(err);
  }
};

blogController.GetBlogArchives = async (req, res, next) => {
  try {
    const current_date = new Date();
    const blogArchives = await blogSch
      .find({ is_deleted: false, is_published: true, is_active: true })
      .select({ added_at: 1, published_on: { $lte: current_date }, published_on: 1 })
      .sort({ published_on: 1 })
      .skip(0)
      .limit(10);
    const month = [];
    const months = blogArchives.map((each) => {
      if (month.includes(each.added_at.getMonth())) {
        return null;
      } else {
        month.push(each.added_at.getMonth());
        return each.added_at;
      }
    });
    return otherHelper.sendResponse(res, httpStatus.OK, true, months, null, 'archives get success!', null);
  } catch (err) {
    next(err);
  }
};

blogController.GetBlogNonAuthorize = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 12, false);
    populate = [
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'author',
        select: '_id name',
      },
      {
        path: 'image',
        select: 'path',
      },
    ];
    selectQuery = 'title description summary tags author short_description meta_tag meta-description category keywords slug_url published_on is_active image added_by added_at updated_at updated_by is_showcase';

    searchQuery = {
      author: req.user.id,
      is_published: true,
      is_active: true,
      ...searchQuery,
    };
    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_published_on) {
      searchQuery = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let blogs = await otherHelper.getQuerySendResponse(blogSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totalData);
  } catch (err) {
    next(err);
  }
};

blogController.getHighlightBlog = async (req, res, next) => {
  try {
    const current_date = new Date();
    const searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      is_highlight: true,
      published_on: { $lte: current_date },
    };
    const highlight_blog = await blogSch.find(searchQuery).populate([{ path: 'image', select: 'path' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, highlight_blog, null, 'highlighted blog get successfully', null);
  } catch (err) {
    next(err);
  }
};

blogController.GetBlogUnauthorize = async (req, res, next) => {
  try {
    const size_default = 12;
    let page;
    let size;
    let sortQuery = '-published_on';
    let populate;
    let searchQuery;
    let selectQuery;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    if (req.query.sort) {
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortQuery = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortQuery = '-' + sortfield;
      } else {
        sortQuery = '';
      }
    }
    populate = [
      {
        path: 'category',
        select: '_id title',
      },

      {
        path: 'author',
        select: '_id name',
      },
      {
        path: 'image',
        select: 'path',
      },
    ];
    selectQuery = 'title description summary tags author short_description meta_tag meta-description category keywords slug_url is_active image added_by added_at updated_at updated_by published_on';
    const current_date = new Date();
    searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      is_highlight: false,
      published_on: { $lte: current_date },
    };

    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_published_on) {
      searchQuery = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let blogs = await otherHelper.getQuerySendResponse(blogSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totalData);
  } catch (err) {
    next(err);
  }
};

blogController.GetBlogCategory = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = 'title slug_url description image is_active added_by added_at updated_at updated_by is_deleted';
    searchQuery = { ...searchQuery, is_active: true };

    if (req.query.find_title || req.query.size || req.query.is_active || req.query.page) {
      delete searchQuery.is_active;
      if (req.query.find_title) {
        searchQuery = {
          title: {
            $regex: req.query.find_title,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
      if (req.query.is_active) {
        searchQuery = { is_active: true, ...searchQuery };
      }
    }
    populate = [
      {
        path: 'image',
        select: 'path',
      },
    ];
    let blogCategories = await otherHelper.getQuerySendResponse(blogCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogCategories.data, blogConfig.cget, page, size, blogCategories.totalData);
  } catch (err) {
    next(err);
  }
};
blogController.GetBlogCatById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogcats = await blogCatSch.findOne({ _id: id }).populate([{ path: 'image', select: 'path' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, blogcats, null, blogConfig.cget, null);
  } catch (err) {
    next(err);
  }
};
blogController.SaveBlog = async (req, res, next) => {
  try {
    let blogs = req.body;
    if (blogs.is_highlight !== (true || false)) {
      blogs.is_highlight = false;
    }
    if (blogs.is_highlight == true) {
      await blogSch.updateMany({}, { $set: { is_highlight: false } }, { new: true });
      blogs.is_highlight === true;
    }
    if (blogs && blogs._id) {
      if (!blogs.meta_tag) blogs.meta_tag = [];
      if (!blogs.category) blogs.category = [];
      if (!blogs.tags) blogs.tags = [];
      if (!blogs.keywords) blogs.keywords = [];
      if (!blogs.author) blogs.author = req.user.id;

      const update = await blogSch.findByIdAndUpdate(
        blogs._id,
        {
          $set: blogs,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, blogConfig.save, null);
    } else {
      blogs.added_by = req.user.id;
      blogs.published_on = new Date();
      const newBlog = new blogSch(blogs);
      const BlogSave = await newBlog.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, BlogSave, null, blogConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
blogController.SaveBlogCategory = async (req, res, next) => {
  try {
    let blogcats = req.body;
    if (blogcats && blogcats._id) {
      blogcats.updated_at = new Date();
      blogcats.updated_by = req.user.id;
      const update = await blogCatSch.findByIdAndUpdate(
        blogcats._id,
        {
          $set: blogcats,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, blogConfig.categoryUpdate, null);
    } else {
      const newBlog = new blogCatSch(blogcats);
      const catSave = await newBlog.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, catSave, null, blogConfig.categorySave, null);
    }
  } catch (err) {
    next(err);
  }
};
blogController.GetBlogDetail = async (req, res, next) => {
  const id = req.params.id;
  const populate = [];
  const blog = await blogSch
    .findOne({
      _id: id,
      is_deleted: false,
    })
    .populate(populate);
  return otherHelper.sendResponse(res, httpStatus.OK, true, blog, null, blogConfig.get, null);
};
blogController.GetBlogBySlug = async (req, res, next) => {
  const slug = req.params.slug_url;
  const current_date = new Date();
  let filter = { is_deleted: false, is_published: true, published_on: { $lte: current_date } };
  if (objectId.isValid(slug)) {
    filter._id = slug;
  } else {
    filter.slug_url = slug;
  }
  const blogs = await blogSch
    .findOne(filter, {
      is_published: 0,
    })
    .populate([
      { path: 'author', select: '_id name avatar image bio author.bio social_link' },
      { path: 'category', select: '_id title slug_url' },
      { path: 'image', select: 'path' },
    ]);
  if (!blogs) {
    return otherHelper.sendResponse(res, httpStatus.OK, false, blogs, 'no blog found', 'no blog found', null);
  }
  return otherHelper.sendResponse(res, httpStatus.OK, true, blogs, null, blogConfig.get, null);
};

blogController.GetBlogById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogs = await blogSch
      .findOne({
        _id: id,
        is_deleted: false,
      })
      .populate([{ path: 'image', select: 'path' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, blogs, null, blogConfig.get, null);
  } catch (err) {
    next(err);
  }
};

blogController.GetBlogByCat = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    const slug = req.params.slug_url;
    const current_date = new Date();
    const cat = await blogCatSch.findOne({ slug_url: slug, is_deleted: false }, { _id: 1, title: 1 });
    let blogs = { data: [], totalData: 0 };
    if (cat && cat._id) {
      populate = [
        {
          path: 'category',
          select: 'title slug_url',
        },
        {
          path: 'author',
          select: 'name',
        },
        {
          path: 'image',
          select: 'path',
        },
      ];
      selectQuery = 'title description summary tags author short_description meta_tag meta-description category keywords slug_url published_on is_active image added_by added_at updated_at updated_by';
      searchQuery = {
        is_published: true,
        is_active: true,
        published_on: { $lte: current_date },
        category: cat && cat._id,
        ...searchQuery,
      };
      if (req.query.find_title) {
        searchQuery = {
          title: {
            $regex: req.query.find_title,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
      if (req.query.find_published_on) {
        searchQuery = {
          published_on: {
            $regex: req.query.find_published_on,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
      blogs = await otherHelper.getQuerySendResponse(blogSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    }
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, (cat && cat.title) || 'Category', page, size, blogs.totalData);
  } catch (err) {
    next(err);
  }
};
blogController.GetBlogByTag = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery;
    let populateq;

    // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    const tag = req.params.tag;
    populateq = [
      { path: 'author', select: 'name' },
      {
        path: 'image',
        select: 'path',
      },
    ];
    const current_date = new Date();
    searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      tags: tag,
      published_on: { $lte: current_date },
    };
    const tagBlog = await otherHelper.getQuerySendResponse(blogSch, page, size, { published_on: -1 }, searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagBlog.data, blogConfig.get, page, size, tagBlog.totalData);
  } catch (err) {
    next(err);
  }
};
blogController.GetBlogByAuthor = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery;
    let populateq;

    // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    const authorId = req.params.author;
    populateq = [
      { path: 'author', select: 'name' },
      {
        path: 'image',
        select: 'path',
      },
    ];
    const current_date = new Date();
    searchQuery = { is_deleted: false, is_active: true, author: authorId, is_published: true, published_on: { $lte: current_date } };
    const blogByAuthor = await otherHelper.getQuerySendResponse(blogSch, page, size, { published_on: -1 }, searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogByAuthor.data, 'blogs by author get success!', page, size, blogByAuthor.totalData);
  } catch (err) {
    next(err);
  }
};
blogController.GetBlogByDate = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery;
    let populateq;

    // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    let start = new Date(req.params.time);
    let end = new Date(req.params.time);
    end.setMonth(end.getMonth() + 1);

    const current_date = new Date();
    searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      published_on: { $lte: current_date },
    };
    if (start) {
      searchQuery = {
        added_at: {
          $gte: start,
          $lt: end,
        },
        ...searchQuery,
      };
    }
    populateq = [
      { path: 'category', select: 'title' },
      { path: 'author', select: 'name' },
      {
        path: 'image',
        select: 'path',
      },
    ];

    const tagBlog = await otherHelper.getQuerySendResponse(blogSch, page, size, '', searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagBlog.data, blogConfig.get, page, size, tagBlog.totalData);
  } catch (err) {
    next(err);
  }
};
blogController.DeleteBlog = async (req, res, next) => {
  const id = req.params.id;
  const blog = await blogSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, blog, null, blogConfig.delete, null);
};
blogController.DeleteBlogCat = async (req, res, next) => {
  const id = req.params.id;
  const blogCat = await blogCatSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  await blogSch.updateMany({ category: id }, { $set: { is_deleted: true } });
  return otherHelper.sendResponse(res, httpStatus.OK, true, blogCat, null, blogConfig.deleteCat, null);
};

blogController.CountBlogByCat = async (req, res, next) => {
  const id = req.params.id;
  const blogCount = await blogSch.countDocuments({ category: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, blogCount, null, 'blog count by category', null);
};

blogController.getstaticBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await (await blogSch.findOne({ _id: id }).select('title description image')).populated([{ path: 'image', select: 'path' }]);
    let newdata = `<h1>${data.title}</h1><img src=${blogConfig.image_base + data.image.path} /><p>${data.description}</p>`;
    return otherHelper.sendResponse(res, httpStatus.OK, true, newdata, null, 'blog get successfull', null);
  } catch (err) {
    next(err);
  }
};

blogController.updateViewCount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const date_only = moment().format('YYYY-MM-DD');
    let d = await blogViewCountSch.findOneAndUpdate({ blog_id: id, date: date_only }, { $inc: { count: 1 } });
    if (!d) {
      const newBlogCount = new blogViewCountSch({ blog_id: id, date: date_only, count: 1 });
      d = await newBlogCount.save();
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, null, null);
  } catch (err) {
    next(err);
  }
};

blogController.GetBlogCategoryActive = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = 'title slug_url description image is_active added_by added_at updated_at updated_by is_deleted';

    searchQuery = { is_active: true, ...searchQuery };

    let blogCategories = await otherHelper.getQuerySendResponse(blogCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogCategories.data, blogConfig.cget, page, size, blogCategories.totalData);
  } catch (err) {
    next(err);
  }
};


blogController.selectMultipleDataBlog = async (req, res, next) => {
  const { blog_id, type } = req.body;

  if (type == 'is_published') {
    const Data = await blogSch.updateMany(
      { _id: { $in: blog_id } },
      [{
        $set: {
          is_published: { $not: "$is_published" }
        },
      }],
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  }
  else if (type == 'is_active') {
    const Data = await blogSch.updateMany(
      { _id: { $in: blog_id } },
      [{
        $set: {
          is_active: { $not: "$is_active" }
        },
      }],
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  }
  else {
    const Data = await blogSch.updateMany(
      { _id: { $in: blog_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  };
};


blogController.selectMultipleDataCat = async (req, res, next) => {
  const { blog_category_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await blogCatSch.updateMany(
      { _id: { $in: blog_category_id } },
      [{
        $set: {
          is_active: { $not: "$is_active" }
        },
      }],
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  }
  else {
    const Data = await blogCatSch.updateMany(
      { _id: { $in: blog_category_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  };
};

module.exports = blogController;
