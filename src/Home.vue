<script lang="ts" setup>
import { ref } from 'vue';

import logo from '~/assets/logo.png';

import Dialog from '~/components/Dialog.vue';

const dialog = ref(false);
</script>

<template>
  <router-link
    :to="{ name: 'storePattern' }"
    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
  >
    Store Pattern
  </router-link>

  <div class="my-10">
    <button class="block border text-white bg-blue-500" @click="dialog = true">Open Dialog</button>
  </div>

  <img alt="Vue logo" :src="logo" />

  <div class="border border-gray-300">
    <div class="text-2xl">Iconify</div>

    <!-- A basic anchor icon from Phosphor icons -->
    <div class="i-ph-anchor-simple-thin"></div>
    <!-- An orange alarm from Material Design Icons -->
    <div class="i-mdi-alarm text-orange-400"></div>
    <!-- A large Vue logo -->
    <div class="i-logos-vue text-3xl"></div>
    <!-- Sun in light mode, Moon in dark mode, from Carbon -->
    <button class="i-carbon-sun dark:i-carbon-moon"></button>
    <!-- Twemoji of laugh, turns to tear on hovering -->
    <div
      class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"
    ></div>
  </div>

  <Dialog v-model="dialog" />
</template>
