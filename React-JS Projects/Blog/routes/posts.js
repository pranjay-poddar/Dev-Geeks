const express =require('express');

const { getPosts, getPost, createPost}=require('../controllers/posts.js');

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);

module.exports=router;