import { GET_USER, RESET_SCORE, SETTINGS, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
  settings: {},
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_USER:
    return {
      ...state,
      gravatarEmail: payload.email,
      name: payload.name,
    };
  case SET_SCORE:
    return {
      ...state,
      score: state.score + payload,
      assertions: state.assertions + 1,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case SETTINGS:
    return {
      ...state,
      settings: payload,
    };
  default:
    return state;
  }
};

export default userReducer;
