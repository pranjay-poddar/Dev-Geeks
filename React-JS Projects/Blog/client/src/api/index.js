import axios from 'axios';

const url = '/api/posts/';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
