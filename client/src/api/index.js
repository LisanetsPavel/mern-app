import axios from "axios";

const url = 'https://mern-pavel-app.herokuapp.com/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (data) => axios.post(url, data);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
