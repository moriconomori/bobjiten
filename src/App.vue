<template>
  <q-layout>
    <q-page-container class="bg-light-blue-1">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <span>カタヌキ</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-page class="q-px-xl">
        <router-view />

        <q-toolbar>
          <q-toolbar-title class="text-center">
            <small>&copy; 2019 Morico</small>
          </q-toolbar-title>
        </q-toolbar>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
