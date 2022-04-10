import { CREATE, UPDATE, FETCH_ALL, DELETE, LIKE } from '../constants/actionTypes'
import * as api from '../api';

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPosts = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPosts(post);

        dispatch({ type: CREATE, payload: data });
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