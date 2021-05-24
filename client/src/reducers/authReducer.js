import { SIGNED_IN, SIGNED_OUT } from '../actions/types';

const INITIAL_STATE = {
  user: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return { ...state, user: action.payload };
    case SIGNED_OUT:
      return { ...state, user: false };
    default:
      return state;
  }
};
