<template>
  <div>
    <div class="q-mb-lg card-wrap">
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft"
      >
        <div
          v-show="cardShow"
          style="animation-duration: 0.3s"
          class="card q-px-lg"
        >
          <q-card class="flex flex-center">
            <q-card-section>
              <span>{{ word }}</span>
            </q-card-section>
          </q-card>
        </div>
      </transition>
    </div>

    <div class="q-mx-lg q-my-sm">
      <q-btn
        rounded
        color="primary"
        size="16px"
        :disable="loading"
        class="full-width q-py-xs"
        style="border-radius: 100vw;"
        @click="next"
      >
        <span>{{ playing ? 'NEXT' : 'START' }}</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: function() {
    return {
      loading: true,
      playing: false,
      words: {},
      word: 'Loading...',
      cardShow: true,
      settings: {
        included: { v0: true, v1: true, v2: true },
        ratio: { normal: 80, gesture: 10, katakoto: 10 },
      },
    }
  },

  created: async function() {
    this.words = (
      await this.axios.get(
        'https://script.google.com/macros/s/AKfycbws3-V2qvM3RY3rLlmtw_D0cmeYHWbf8xUJx_cnQ885x_Cs3cU/exec'
      )
    ).data
    this.init()
  },

  methods: {
    init() {
      this.loading = false
      this.word = 'お題 CARD'
    },

    async next() {
      if (!this.playing) {
        this.playing = true
      }
      this.cardShow = false
      await this.sleep(200)
      this.cardShow = true
    },

    sleep(msec) {
      return new Promise((r) => setTimeout(r, msec))
    },
  },
}
</script>

<style scoped>
.card-wrap {
  height: 35vw;
}

.card {
  height: 100%;
}

.card .q-card {
  height: 100%;
  width: 100%;
  margin: auto;
}
</style>
