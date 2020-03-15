import words from '~/assets/data/words.json'

function getVersions() {
  const versions = Object.keys(words)
  const included = {}

  for (let i = 0; i < versions.length; i++) {
    const v = versions[i]
    included[v] = true
  }

  return included
}

const defaultSettings = {
  included: getVersions(),
  typeRatio: { normal: 80, gesture: 10, katakoto: 10 },
}

export const state = () => ({
  settings: {
    included: Object.assign({}, defaultSettings.included),
    typeRatio: Object.assign({}, defaultSettings.typeRatio),
  },
  words,
  remainWords: words.v0.concat(words.v1.concat(words.v2)),
  nextRemainWords: '',
})

export const getters = {
  getIncluded(state) {
    return state.included
  },

  getWords(state) {
    return state.words
  },

  getRemainWords(state) {
    return state.remainWords
  },

  getTypeRatio(state) {
    const sum =
      state.settings.typeRatio.normal +
      state.settings.typeRatio.gesture +
      state.settings.typeRatio.katakoto

    return {
      normal: state.settings.typeRatio.normal,
      gesture: state.settings.typeRatio.gesture,
      katakoto: state.settings.typeRatio.katakoto,
      sum,
    }
  },

  getNextWord(state) {
    return state.nextRemainWords
  },
}

export const mutations = {
  SET_INCLUDED(state, payload) {
    state.settings.included[payload.version] = payload.checked
  },

  SET_TYPE_RATIO(state, payload) {
    state.settings.typeRatio[payload.type] = payload.ratio
  },

  RESET_SETTINGS(state) {
    Object.assign(state.settings.included, defaultSettings.included)
    Object.assign(state.settings.typeRatio, defaultSettings.typeRatio)
  },

  INIT_GAME(state) {
    const included = state.settings.included
    const words = state.words
    state.remainWords = []

    for (const version in included) {
      if (included[version]) {
        state.remainWords = state.remainWords.concat(words[version])
      }
    }
  },

  DRAW_NEXT_WORD(state, index) {
    const next = state.remainWords.splice(index, 1)[0]
    state.nextRemainWords = next
  },
}
