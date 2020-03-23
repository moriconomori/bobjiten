export const playersActionTypes = {
  ADD_PLAYER: 'ADD_PLAYER',
};

export const playersAction = payload => dispatch => {
  return dispatch({
    type: playersActionTypes.ADD_PLAYER,
    payload,
  });
};
