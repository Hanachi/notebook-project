import { FETCH_ALL, TOGGLE_LOADING } from '../constants/actionTypes'; 

const initialState = {
	list: [],
	loading: false,
}

export const postsReducer = (posts = initialState, action) => {
	switch(action.type) {
		case FETCH_ALL: {
			return {
				...posts,
				list: action.payload.data,
			}
		}

		case TOGGLE_LOADING: {
			return {
				...posts,
				loading: action.payload
			}
		}
		default: {
			return posts;
		}
	}
}