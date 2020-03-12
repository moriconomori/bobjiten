<template>
  <div>
    <q-responsive :ratio="16 / 9">
      <q-card class="flex flex-center">
        <q-card-section>
          <span>カタヌキ</span>
        </q-card-section>
      </q-card>
    </q-responsive>

    <q-btn rounded size="16px" class="full-width q-py-xs">
      <span>START</span>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: function() {
    return {
      words: {},
    }
  },

  created: function() {},
}
</script>

<style scoped>
.q-btn--rounded {
  border-radius: 999px;
}
</style>
