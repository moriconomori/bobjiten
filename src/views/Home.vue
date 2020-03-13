<template>
  <div>
    <div class="q-mb-lg card-wrap">
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft"
      >
        <div
          v-show="card.show"
          style="animation-duration: 0.3s"
          class="fit q-px-lg"
        >
          <q-card :class="card.bgColor" class="fit flex flex-center">
            <span class="absolute-top-right q-pt-xs q-pr-sm">
              {{ status.playing ? word.typeLabel[word.type] : '' }}
            </span>
            <q-card-section>
              <span class="text-h5">{{ word.string }}</span>
            </q-card-section>
          </q-card>
        </div>
      </transition>
    </div>

    <div class="q-mx-lg q-my-sm">
      <q-btn
        rounded
        color="primary"
        :disable="status.loading || status.gameover"
        class="full-width q-py-xs"
        style="border-radius: 100vw;"
        @click="drawCard()"
      >
        <span class="text-h5">{{ status.playing ? '次のお題' : 'START' }}</span>
      </q-btn>
    </div>

    <div class="flex justify-around q-my-lg">
      <q-btn round color="positive" size="xl" icon="done" />
      <q-btn round color="negative" size="xl" icon="clear" />
    </div>

    <q-expansion-item icon="settings" label="設定">
      <q-list>
        <q-item-label header>含めるカタカナ語</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>オリジナル</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox
              :disable="status.playing"
              v-model="settings.included.v0"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>その 1</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox
              :disable="status.playing"
              v-model="settings.included.v1"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>その 2</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox
              :disable="status.playing"
              v-model="settings.included.v2"
            />
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item-label header>出現比率</q-item-label>

        <div class="row">
          <div class="col col-sm-auto flex column justify-around">
            <q-item class="q-pr-none">
              <q-item-section class="fit q-pr-none">
                <div class="flex justify-between items-center fit">
                  <span>普通</span>
                  <span class="type-ratio">
                    {{ settings.typeRatio.normal }}
                  </span>
                </div>
              </q-item-section>
            </q-item>
            <q-item class="q-pr-none">
              <q-item-section class="fit q-pr-none">
                <div class="flex justify-between items-center fit">
                  <span>ジェスチャー</span>
                  <span class="type-ratio">
                    {{ settings.typeRatio.gesture }}
                  </span>
                </div>
              </q-item-section>
            </q-item>
            <q-item class="q-pr-none">
              <q-item-section class="fit q-pr-none">
                <div class="flex justify-between items-center fit">
                  <span>カタコト</span>
                  <span class="type-ratio">
                    {{ settings.typeRatio.katakoto }}
                  </span>
                </div>
              </q-item-section>
            </q-item>
          </div>
          <div class="col">
            <q-item>
              <q-item-section>
                <q-slider
                  :disable="status.playing"
                  v-model="settings.typeRatio.normal"
                  :min="0"
                  :max="100"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-slider
                  :disable="status.playing"
                  v-model="settings.typeRatio.gesture"
                  :min="0"
                  :max="100"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-slider
                  :disable="status.playing"
                  v-model="settings.typeRatio.katakoto"
                  :min="0"
                  :max="100"
                />
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import '@quasar/extras/animate/slideInRight.css'
import '@quasar/extras/animate/slideOutLeft.css'

export default {
  name: 'Home',

  data: function() {
    return {
      status: {
        loading: true,
        playing: false,
        gameover: false,
      },
      words: {
        all: [],
        remain: [],
      },
      word: {
        string: 'Loading...',
        type: '',
        typeLabel: {
          normal: '',
          gesture: 'ジェスチャー',
          katakoto: 'カタコト',
        },
      },
      card: {
        show: true,
        bgColor: '',
      },
      settings: {
        included: { v0: true, v1: true, v2: true },
        typeRatio: { normal: 80, gesture: 10, katakoto: 10 },
      },
    }
  },

  created: async function() {
    this.words.all = (
      await this.axios.get(
        'https://script.google.com/macros/s/AKfycbws3-V2qvM3RY3rLlmtw_D0cmeYHWbf8xUJx_cnQ885x_Cs3cU/exec'
      )
    ).data
    this.initApp()
  },

  methods: {
    initApp() {
      this.status.loading = false
      this.word.string = 'お題 CARD'
    },

    initGame() {
      const included = this.settings.included
      for (const version in included) {
        if (included[version]) {
          this.words.remain = this.words.remain.concat(this.words.all[version])
        }
      }
    },

    async drawCard() {
      if (!this.status.playing) {
        this.initGame()
        this.status.playing = true
      }

      const nextWord = this.drawNextWord()
      this.card.show = false
      await this.sleep(150)

      if (nextWord === '') {
        this.word.type = 'normal'
        this.card.bgColor = ''
        this.status.gameover = true
        this.status.playing = false
        this.word.string = 'GAME OVER'
        this.card.show = true
        return
      }

      switch (this.getRandType()) {
        case 'normal':
          this.word.type = 'normal'
          this.card.bgColor = ''
          break
        case 'gesture':
          this.word.type = 'gesture'
          this.card.bgColor = 'bg-green-2'
          break
        case 'katakoto':
          this.word.type = 'katakoto'
          this.card.bgColor = 'bg-yellow-2'
          break
        default:
          break
      }

      this.word.string = nextWord
      this.card.show = true
    },

    drawNextWord() {
      const count = this.words.remain.length
      if (count < 1) {
        return ''
      }

      const index = Math.floor(Math.random() * count)
      return this.words.remain.splice(index, 1)[0]
    },

    getRandType() {
      const typeRatio = this.settings.typeRatio
      const typeRatioSum =
        typeRatio.normal + typeRatio.gesture + typeRatio.katakoto
      const rnd = Math.floor(Math.random() * typeRatioSum) + 1
      let type

      if (rnd <= typeRatio.normal) {
        type = 'normal'
      } else if (rnd <= typeRatio.normal + typeRatio.gesture) {
        type = 'gesture'
      } else {
        type = 'katakoto'
      }

      return type
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
  max-height: 250px;
}

@media (min-width: 0px) {
  .row > .col-sm-auto {
    flex: 0 0 auto;
  }
}

.type-ratio {
  text-align: right;
  min-width: 2em;
}
</style>
