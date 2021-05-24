import axios from 'axios';
import history from '../history';
import { SIGNED_IN, SIGNED_OUT } from './types';

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/current_user');
    dispatch({ type: SIGNED_IN, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const verifyUser = (confirmationCode) => async (dispatch) => {
  try {
    await axios.get(`/api/auth/confirm/${confirmationCode}`);
    dispatch(fetchUser());
  } catch (err) {
    console.log(err);
  }
};

export const signInUser = (email, password, rememberMe) => async (dispatch) => {
  try {
    await axios.post('/api/signin', {
      email,
      password,
      rememberMe,
    });
    dispatch(fetchUser());
  } catch (err) {
    console.log(err);
  }
};

export const emailConfirmation = (email) => async () => {
  try {
    await axios.post('/api/reset/confirm/email', { email });
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword =
  (password, confirmPassword, resetPasswordToken) => async () => {
    try {
      await axios.post(`/api/reset/password/${resetPasswordToken}`, {
        password,
        confirmPassword,
      });
      history.push('/signin');
    } catch (err) {
      console.log(err);
    }
  };

export const signUpUser =
  (firstName, lastName, email, password) => async () => {
    try {
      await axios.post('/api/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      history.push('/signin');
    } catch (err) {
      console.log(err);
    }
  };

export const editProfileInfo =
  (userId, firstName, lastName) => async (dispatch) => {
    try {
      await axios.post(`/api/edit/profile/info/${userId}`, {
        firstName,
        lastName,
      });
      dispatch(fetchUser());
    } catch (err) {
      console.log(err);
    }
  };

export const uploadProfilePicture = (userId, imageFile) => async () => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile[0]);
    await axios.post(`/api/edit/profile/image/${userId}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    await axios.get('/api/signout');
    dispatch({ type: SIGNED_OUT });
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};
