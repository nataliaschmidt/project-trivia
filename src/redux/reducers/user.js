import { GET_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_USER:
    return {
      ...state,
      email: payload.email,
      name: payload.name,
    };
  default:
    return state;
  }
};

export default userReducer;
