const express = require('express');
const router = express.Router();
const blogModule = require('../../modules/blog/blogController');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const { catSanitize, catValidate, sanitize, validate, countValidate, countSanitize } = require('../../modules/blog/blogValidation');

router.get('/auth', authentication, authorization, blogModule.GetBlogAuthorize);
router.get('/', authentication, blogModule.GetBlogNonAuthorize);
router.get('/public', blogModule.GetBlogUnauthorize);
router.get('/highlight', blogModule.getHighlightBlog);
router.get('/latest', blogModule.getLatestBlog);
router.get('/showcase', blogModule.getShowcaseBlog);
router.get('/trending', blogModule.getTrendingBlog);
router.get('/latest/:cat_id', blogModule.getLatestBlogByCat);
router.get('/related/:slug_url', blogModule.getRelatedBlog);
router.get('/category', blogModule.GetBlogCategory);
router.get('/category/active', blogModule.GetBlogCategoryActive);
router.get('/category/:id', blogModule.GetBlogCatById);
router.get('/blog/:slug_url', blogModule.GetBlogBySlug);
router.get('/blogbyid/:id', blogModule.GetBlogById);
router.get('/blogbycat/:slug_url', blogModule.GetBlogByCat);
router.get('/blogbytag/:tag', blogModule.GetBlogByTag);
router.get('/blogbyauthor/:author', blogModule.GetBlogByAuthor);
router.get('/blogbytime', blogModule.GetBlogArchives);
router.get('/blogbytime/:time', blogModule.GetBlogByDate);
router.post('/', authentication, authorization, sanitize, validate, blogModule.SaveBlog);
router.post('/category', authentication, authorization, catSanitize, catValidate, blogModule.SaveBlogCategory);
router.delete('/:id', authentication, authorization, blogModule.DeleteBlog);
router.delete('/category/:id', authentication, authorization, blogModule.DeleteBlogCat);
router.get('/htmlblog/:id', blogModule.getstaticBlog);

router.get('/count/increase/:id', countSanitize, countValidate, blogModule.updateViewCount);
router.get('/count/category/:id', authentication, authorization, blogModule.CountBlogByCat)
router.post('/multiple/blog', authentication, authorization, blogModule.selectMultipleDataBlog);
router.post('/multiple/category', authentication, authorization, blogModule.selectMultipleDataCat);

module.exports = router;
