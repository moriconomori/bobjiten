<template>
  <div>
    <div class="card-wrap">
      <transition name="left" mode="out-in" @afterLeave="afterLeave">
        <v-card v-if="card.show" :color="card.bgColor" class="ma-6">
          <v-card-title class="d-flex justify-center">
            <span class="py-10">{{ word.string }}</span>
          </v-card-title>
          <div class="ma-2 word__type">{{ word.typeLabel[word.type] }}</div>
        </v-card>
      </transition>
    </div>

    <div class="mx-6 mb-6">
      <v-btn
        block
        color="primary"
        :disabled="gameover"
        rounded
        x-large
        class="title"
        @click="next()"
      >
        次のお題を引く
      </v-btn>
      <audio ref="soundDraw" src="/sound/draw.mp3"></audio>
    </div>

    <div class="d-flex justify-space-around">
      <v-btn
        color="success"
        :disabled="gameover"
        fab
        x-large
        @click="answer('correct')"
      >
        <v-icon>mdi-check</v-icon>
        <audio ref="soundCorrect" src="/sound/correct.mp3"></audio>
      </v-btn>
      <v-btn
        color="error"
        :disabled="gameover"
        fab
        x-large
        @click="answer('incorrect')"
      >
        <v-icon>mdi-close</v-icon>
        <audio ref="soundIncorrect" src="/sound/incorrect.mp3"></audio>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',

  data() {
    return {
      gameover: false,
      word: {
        string: 'START',
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
      sound: {
        draw: null,
        correct: null,
        incorrect: null,
      },
    }
  },

  computed: {
    remainWords() {
      return this.$store.getters.getRemainWords
    },
    typeRatio() {
      return this.$store.getters.getTypeRatio
    },
  },

  created() {
    this.sound.draw = this.$refs.soundDraw
    this.sound.correct = this.$refs.soundCorrect
    this.sound.incorrect = this.$refs.soundIncorrect
  },

  methods: {
    answer(answer) {
      let sound

      switch (answer) {
        case 'correct':
          sound = this.$refs.soundCorrect
          break
        case 'incorrect':
          sound = this.$refs.soundIncorrect
          break
        default:
          break
      }
      sound.currentTime = 0
      sound.play()
    },

    next() {
      this.card.show = false
      const sound = this.$refs.soundDraw
      sound.currentTime = 0
      sound.play()
    },

    drawCard() {
      const nextWord = this.getNextWordRand()

      if (nextWord === '') {
        this.word.string = 'GAME OVER'
        this.word.type = 'normal'
        this.card.bgColor = ''
        this.gameover = true
        this.card.show = true
        return
      }

      switch (this.getWordTypeRand()) {
        case 'normal':
          this.word.type = 'normal'
          this.card.bgColor = ''
          break
        case 'gesture':
          this.word.type = 'gesture'
          this.card.bgColor = 'green lighten-4'
          break
        case 'katakoto':
          this.word.type = 'katakoto'
          this.card.bgColor = 'yellow lighten-4'
          break
        default:
          break
      }

      this.word.string = nextWord
    },

    getNextWordRand() {
      const count = this.remainWords.length
      if (count < 1) {
        return ''
      }

      const index = Math.floor(Math.random() * count)
      this.$store.commit('DRAW_NEXT_WORD', index)

      return this.$store.getters.getNextWord
    },

    getWordTypeRand() {
      const typeRatio = this.typeRatio
      const typeRatioSum = this.typeRatio.sum

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
      return new Promise((resolve) => setTimeout(resolve, msec))
    },

    afterLeave() {
      this.drawCard()
      this.card.show = true
    },
  },
}
</script>

<style scoped>
.word__type {
  position: absolute;
  top: 0;
  right: 0;
}

.card-wrap {
  overflow: hidden;
  height: 192px;
}

.left-leave {
  transform: translateX(0px) translateX(0px);
}

.left-leave-active {
  transition: transform 100ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.left-leave-to {
  transform: translateX(-100vw) translateX(0px);
}

.left-enter {
  transform: translateX(100vw) translateX(0px);
}

.left-enter-active {
  transition: transform 100ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.left-enter-to {
  transform: translateX(0px) translateX(0px);
}
</style>
