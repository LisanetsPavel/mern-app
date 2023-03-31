import * as api from '../api';
import {
  COMMENT,
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH, FETCH_POST,
  LIKE,
  START_LOADING,
  UPDATE,
} from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    const action = {
      type: FETCH_ALL,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    const action = {
      type: FETCH_BY_SEARCH,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    const action = {
      type: FETCH_POST,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(newPost);
    const action = {
      type: CREATE,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    const action = {
      type: UPDATE,
      payload: data,
    };

    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    const action = {
      type: DELETE,
      payload: id,
    };

    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    const action = {
      type: LIKE,
      payload: data,
    };

    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    const action = {
      type: COMMENT,
      payload: data,
    };

    dispatch(action);
    return data.comments;
  } catch (error) {
    console.log(error);
  }
  return null;
};
