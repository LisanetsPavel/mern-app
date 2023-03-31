import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || process.env.REACT_APP_API_LOCAL_URL });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(
  `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`,
);

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (data) => API.post('/posts', data);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const signin = (formData) => API.post('users/signin', formData);
export const signup = (formData) => API.post('users/signup', formData);
