<template>
  <div>
    <h2 class="title">含めるカタカナ語</h2>
    <p>
      <v-checkbox v-model="v0" label="オリジナル" />
    </p>
    <p>
      <v-checkbox v-model="v1" label="その 1" />
    </p>
    <p>
      <v-checkbox v-model="v2" label="その 2" />
    </p>

    <h2 class="title">出現比率</h2>
    <p>
      <v-slider v-model="normal" min="0" max="100" label="普通" />
    </p>
    <p>
      <v-slider v-model="gesture" min="0" max="100" label="ジェスチャー" />
    </p>
    <p>
      <v-slider v-model="katakoto" min="0" max="100" label="カタコト" />
    </p>
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
}
</script>
