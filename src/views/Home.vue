<template>
  <div>
    <q-responsive :ratio="16 / 9" class="q-mb-lg">
      <q-card class="flex flex-center">
        <q-card-section>
          <span>{{ card }}</span>
        </q-card-section>
      </q-card>
    </q-responsive>

    <q-btn
      rounded
      color="primary"
      size="16px"
      :disable="loading"
      class="full-width q-py-xs"
    >
      <span>START</span>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: function() {
    return {
      loading: true,
      words: {},
      card: 'Loading...',
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
      this.card = 'お題 CARD'
    },
  },
}
</script>

<style scoped>
.q-btn--rounded {
  border-radius: 999px;
}
</style>
