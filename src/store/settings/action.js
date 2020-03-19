export const settingsActionTypes = {
  SET_SETTINGS: 'SET_SETTINGS',
};

export const settingsAction = settings => dispatch => {
  return dispatch({
    type: settingsActionTypes.SET_SETTINGS,
    settings,
  });
};
