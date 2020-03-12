<template>
  <q-layout class="bg-light-blue-1">
    <q-page-container>
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <span>カタヌキ</span>
        </q-toolbar-title>
      </q-toolbar>

      <div class="page-container">
        <router-view />
      </div>

      <q-toolbar>
        <q-toolbar-title class="text-center">
          <small>&copy; 2019 Morico, Designed by ちきん</small>
        </q-toolbar-title>
      </q-toolbar>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.page-container {
  overflow: hidden;
}
</style>
