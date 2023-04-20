export const GET_USER = 'GET_USER';

export const actionGetUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const SET_SCORE = 'SET_SCORE';

export const actionSetScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

export const RESET_SCORE = 'RESET_SCORE';

export const actionResetScore = () => ({
  type: RESET_SCORE,
});
