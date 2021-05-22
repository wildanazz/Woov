import { SIGNED_IN, SIGNED_OUT } from '../actions/types';

const INITIAL_STATE = {
  userId: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return { ...state, userId: action.payload };
    case SIGNED_OUT:
      return { ...state, userId: '' };
    default:
      return state;
  }
};
