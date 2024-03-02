import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPostsAPI = () => axios.get(url);
export const createPostAPI = (newPost) => axios.post(url, newPost);
