import { playersActionTypes } from './action';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case playersActionTypes.ADD_PLAYER:
      return [...state, { name: action.payload.name, score: 0 }];
    default:
      return state;
  }
};
