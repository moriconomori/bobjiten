<template>
  <div class="ma-6">
    <v-card class="mb-6">
      <v-card-title class="d-flex justify-center">
        <span class="py-10">カタヌキ</span>
      </v-card-title>
    </v-card>

    <p class="text-center headline">カタカナ言葉をカタカナ抜きで説明しよう！</p>
    <div>
      <v-btn
        block
        color="primary"
        rounded
        x-large
        class="headline"
        nuxt
        to="/play"
        @click.native="start()"
      >
        START PLAYING
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
      this.$store.commit('INIT_GAME')
    },
  },
}
</script>
