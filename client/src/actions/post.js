import axios from 'axios';
import { reset } from 'redux-form';
import history from '../utils/history';
import {
  SET_POST,
  SET_ERROR,
  SET_POST_LIST,
  SET_POST_LOADING,
  SET_COMMENT_LOADING
} from './types';

export const setPostLoading = { type: SET_POST_LOADING };

export const setCommentLoading = { type: SET_COMMENT_LOADING };

export const setError = err => ({
  type: SET_ERROR,
  payload: err.response.data
});

export const submitPost = formValues => async dispatch => {
  dispatch(setPostLoading);
  try {
    const post = await axios.post('/api/posts', formValues);
    history.push(`/a/${post.data.category}/${post.data.id}`);
  } catch (err) {
    dispatch(setError(err));
  }
};

export const deletePost = postId => async dispatch => {
  if (window.confirm('Are you sure you want to delete this post?')) {
    dispatch(setPostLoading);
    try {
      await axios.delete(`/api/post/${postId}`);
      history.push('/');
    } catch (err) {
      dispatch(setError(err));
    }
  }
};

export const getPost = postId => async dispatch => {
  dispatch(setPostLoading);
  try {
    const post = await axios.get(`/api/post/${postId}`);
    dispatch({
      type: SET_POST,
      payload: post.data
    });
  } catch (err) {
    dispatch({
      type: SET_POST,
      payload: null
    });
  }
};

export const getPosts = (category = '') => async dispatch => {
  dispatch(setPostLoading);
  try {
    const posts = await axios.get(`/api/posts/${category}`);
    dispatch({
      type: SET_POST_LIST,
      payload: posts.data
    });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const getPostsByUserId = userId => async dispatch => {
  dispatch(setPostLoading);
  try {
    const posts = await axios.get(`/api/user/${userId}`);
    dispatch({
      type: SET_POST_LIST,
      payload: posts.data
    });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const submitVote = (postId, vote) => async dispatch => {
  const voteTypes = {
    '1': 'upvote',
    '0': 'unvote',
    '-1': 'downvote'
  };
  const voteType = voteTypes[vote];
  try {
    await axios.get(`/api/post/${voteType}/${postId}`);
  } catch (err) {
    dispatch(setError(err));
  }
};

export const commentVote = (commentId, vote) => async (dispatch, getState) => {
  const voteTypes = {
    '1': 'upcomm',
    '0': 'uncomm',
    '-1': 'downcomm'
  };
  const voteType = voteTypes[vote];
  const { id: postId } = getState().post.post;
  try {
    await axios.get(`/api/post/${voteType}/${postId}/${commentId}`);
  } catch (err) {
    dispatch(setError(err));
  }
};

export const submitComment = (formValues, postId) => async dispatch => {
  dispatch(setCommentLoading);
  try {
    const post = await axios.post(`/api/post/${postId}`, formValues);
    dispatch({
      type: SET_POST,
      payload: post.data
    });
    dispatch(reset('comment'));
  } catch (err) {
    dispatch(setError(err));
  }
};

export const deleteComment = commentId => async (dispatch, getState) => {
  if (window.confirm('Are you sure you want to delete this comment?')) {
    try {
      const { id: postId } = getState().post.post;
      await axios.delete(`/api/post/${postId}/${commentId}`);
      dispatch(getPost(postId));
    } catch (err) {
      dispatch(setError(err));
    }
  }
};
