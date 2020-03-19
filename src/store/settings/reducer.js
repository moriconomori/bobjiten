import { settingsActionTypes } from './action';

const initialState = {
  included: { v0: true, v1: true, v2: true },
  sound: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case settingsActionTypes.SET_SETTINGS:
      return Object.assign({}, action.settings);
    default:
      return state;
  }
};
