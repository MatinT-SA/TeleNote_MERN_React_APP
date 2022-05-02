import { CREATE, UPDATE, FETCH_POST, START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, DELETE, LIKE, COMMENT } from '../constants/actionTypes'
import * as api from '../api';

//Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: { post: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPosts = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPosts(post);

        history.push(`/posts/${data._id}`);
        dispatch({ type: CREATE, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const updatedPost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatedPost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletedPost = (id) => async (dispatch) => {
    try {
        await api.deletedPost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });
        //returning the newest comment that's coming in
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}