<template>
  <v-app>
    <v-app-bar app hide-on-scroll class="light-blue lighten-5">
      <v-toolbar-title class="d-flex align-center title py-2">
        <img src="~/assets/logo.png" alt="カタヌキ" class="title__logo" />
      </v-toolbar-title>
      <v-spacer />
      <v-btn text to="/settings">
        <v-icon left>mdi-cog-outline</v-icon>
        設定
      </v-btn>
    </v-app-bar>

    <v-content class="light-blue lighten-5">
      <nuxt />
    </v-content>

    <v-footer>
      <span>&copy; 2019 Morico</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped>
.title {
  height: 100%;
}

.title__logo {
  height: 100%;
}
</style>
