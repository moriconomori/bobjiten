<template>
  <v-app>
    <v-app-bar app class="light-blue lighten-5">
      <v-toolbar-title>カタヌキ</v-toolbar-title>
      <v-spacer />
      <v-btn to="/settings">設定</v-btn>
    </v-app-bar>

    <v-content class="light-blue lighten-5">
      <v-container>
        <nuxt />
      </v-container>
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
