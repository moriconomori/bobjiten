const defaultSettings = {
  included: { v0: true, v1: true, v2: true },
  typeRatio: { normal: 80, gesture: 10, katakoto: 10 },
}

export const state = () => ({
  included: Object.assign({}, defaultSettings.included),
  typeRatio: Object.assign({}, defaultSettings.typeRatio),
})

export const mutations = {
  SET_INCLUDED(state, payload) {
    state.included[payload.version] = payload.checked
  },

  SET_TYPE_RATIO(state, payload) {
    state.typeRatio[payload.type] = payload.ratio
  },

  RESET(state) {
    Object.assign(state.included, defaultSettings.included)
    Object.assign(state.typeRatio, defaultSettings.typeRatio)
  },
}
