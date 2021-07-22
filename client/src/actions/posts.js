import { FETCH_ALL, TOGGLE_LOADING, DELETE_POST } from '../constants/actionTypes'; 
import * as api from '../api';

export const getPosts = () => async (dispatch) => {
	try {
		dispatch({
			type: TOGGLE_LOADING,
			payload: true
		});

		const resp = await api.fetchPosts();
		const { data } = resp || {}
		dispatch({
			type: FETCH_ALL,
			payload: data
		});

		dispatch({
			type: TOGGLE_LOADING,
			payload: false
		});
		return resp
	} catch (error) {
		console.log(error.message);
	}
}

export const createPost = (post) => async (dispatch) => {

	try {
		dispatch({
			type: TOGGLE_LOADING,
			payload: true
		});

		const resp = await api.createPost(post);
		const { data } = resp || {};
		
		dispatch({
			type: TOGGLE_LOADING,
			payload: false
		});

		return data
	} catch (error) {
		console.log(error);
	}
}

export const updatePost = (id, post) => async (dispatch) => {
	try {
		dispatch({
			type: TOGGLE_LOADING,
			payload: true
		});

		const resp = await api.updatePost(id, post);
		const { data } = resp || {};

		dispatch({
			type: TOGGLE_LOADING,
			payload: false
		})
		console.log(data)
		return data
	} catch (error) {
		console.log(error);
	}
}

export const deletePost = (id) => async (dispatch) => {
	try {
		dispatch({
			type: TOGGLE_LOADING,
			payload: true
		})

		await api.deletePost(id);

		dispatch({
			type: DELETE_POST,
			payload: id
		})
		dispatch({
			type: TOGGLE_LOADING,
			payload: false
		})
	} catch (error) {
		console.log(error)
	}
}