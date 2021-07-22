import { AUTH } from '../constants/actionTypes'; 
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const resp = await api.signIn(formData);
    const { data } = resp || {};

    await dispatch({
      type: AUTH,
      data,
    });

    history.push('/');
    return data
  } catch (error) {
    return error.response.data;
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    const resp = await api.signUp(formData);
    const { data } = resp || {};

    dispatch({
      type: AUTH,
      data,
    });

    history.push('/');
    return data;
  } catch (error) {
    return error.response.data;
  }
}