import axios from 'axios';
import history from '../history';
import { SIGNED_IN, SIGNED_OUT } from './types';

export const fetchUserId = () => async (dispatch) => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: SIGNED_IN, payload: response.data._id });
};

export const verifyUser = (confirmationCode) => async (dispatch) => {
  await axios.get(`/api/auth/confirm/${confirmationCode}`);
  dispatch(fetchUserId());
};

export const signInUser = (email, password, rememberMe) => async (dispatch) => {
  try {
    await axios.post('/api/signin', {
      email,
      password,
      rememberMe,
    });
    dispatch(fetchUserId());
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};

export const signUpUser =
  (firstName, lastName, email, password) => async () => {
    try {
      const response = await axios.post('/api/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response);
      history.push('/signin');
    } catch (err) {
      console.log(err);
    }
  };

export const signOutUser = () => async (dispatch) => {
  try {
    await axios.get('/api/signout');
    dispatch({ type: SIGNED_OUT });
  } catch (err) {
    console.log(err);
  }
};
