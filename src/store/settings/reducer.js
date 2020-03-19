import { settingsActionTypes } from './action';

const initialState = {
  included: { v0: true, v1: true, v2: true },
  typeRatio: { normal: 80, gesture: 10, katakoto: 10 },
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
