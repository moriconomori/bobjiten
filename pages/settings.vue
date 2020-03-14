<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h2 class="title">含めるカタカナ語</h2>
      <v-btn outlined @click="reset()">リセット</v-btn>
    </div>

    <v-checkbox v-model="v0" label="オリジナル" />
    <v-checkbox v-model="v1" label="その 1" class="mt-0" />
    <v-checkbox v-model="v2" label="その 2" class="mt-0" />

    <h2 class="title my-4">出現比率</h2>

    <v-row no-gutters>
      <v-col cols="auto" class="pt-1 type-ratio__label">普通</v-col>
      <v-col> <v-slider v-model="normal" min="0" max="100" /> </v-col>
      <v-col cols="auto" class="pt-1 type-ratio__value">{{ normal }}</v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="auto" class="pt-1 type-ratio__label">ジェスチャー</v-col>
      <v-col><v-slider v-model="gesture" min="0" max="100"/></v-col>
      <v-col cols="auto" class="pt-1 type-ratio__value">{{ gesture }}</v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="auto" class="pt-1 type-ratio__label">カタコト</v-col>
      <v-col><v-slider v-model="katakoto" min="0" max="100"/></v-col>
      <v-col cols="auto" class="pt-1 type-ratio__value">{{ katakoto }}</v-col>
    </v-row>

    <v-btn
      block
      color="primary"
      rounded
      x-large
      class="headline my-8"
      nuxt
      to="/play"
    >
      START PLAYING
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Settings',

  computed: {
    ...mapState(['settings']),
    v0: {
      get() {
        return this.settings.included.v0
      },
      set(checked) {
        this.$store.commit('settings/SET_INCLUDED', {
          version: 'v0',
          checked,
        })
      },
    },
    v1: {
      get() {
        return this.settings.included.v1
      },
      set(checked) {
        this.$store.commit('settings/SET_INCLUDED', {
          version: 'v1',
          checked,
        })
      },
    },
    v2: {
      get() {
        return this.settings.included.v2
      },
      set(checked) {
        this.$store.commit('settings/SET_INCLUDED', {
          version: 'v2',
          checked,
        })
      },
    },
    normal: {
      get() {
        return this.settings.typeRatio.normal
      },
      set(ratio) {
        this.$store.commit('settings/SET_TYPE_RATIO', {
          type: 'normal',
          ratio,
        })
      },
    },
    gesture: {
      get() {
        return this.settings.typeRatio.gesture
      },
      set(ratio) {
        this.$store.commit('settings/SET_TYPE_RATIO', {
          type: 'gesture',
          ratio,
        })
      },
    },
    katakoto: {
      get() {
        return this.settings.typeRatio.katakoto
      },
      set(ratio) {
        this.$store.commit('settings/SET_TYPE_RATIO', {
          type: 'katakoto',
          ratio,
        })
      },
    },
  },

  methods: {
    reset() {
      this.$store.commit('settings/RESET')
    },
  },
}
</script>

<style scoped>
.type-ratio__label {
  min-width: 6em;
}

.type-ratio__value {
  text-align: right;
  min-width: 1.7em;
}
</style>
