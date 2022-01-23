import * as api from "../api/index";
import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_POST,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(`Error to fetch post : ${error}`);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(`Error to fetch post : ${error}`);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(`Error to fetch post by search : ${error}`);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);

    navigate(`/posts/${data._id}`);

    dispatch({ type: CREATE, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(`Error to create post : ${error}`);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(`Error to update post : ${error}`);
  }
};

export const deletePost = (id, navigate) => async (dispatch) => {
  try {
    await api.deletePost(id);

    navigate("/");

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(`Error to delete post : ${error}`);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.log(`Error to like post : ${error}`);
  }
};
