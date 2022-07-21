<script setup>
import { ref } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';

import { useState, useActions, useComputeds } from '~/core/store.js';
import logo from '~/assets/logo.png';

import Dialog from '~/components/Dialog.vue';

const dialog = ref(false);
const state = useState();
const actions = useActions();
const computeds = useComputeds();
const { evenOrOdd } = useComputeds();
const localer = useLocaler();
const locale = useLocale();

function changeLang(event) {
  localer.dispatch('setLanguage', event.target.value);
}
</script>

<template>
  <div>{{ state.count }}</div>
  <div>{{ computeds.evenOrOdd.value }}</div>
  <div>{{ evenOrOdd }}</div>
  <button @click="actions.incrementCount">Increment Count</button>

  <div class="my-10">
    <button class="block border text-white bg-blue-500" @click="dialog = true">Open Dialog</button>
  </div>

  <img alt="Vue logo" :src="logo" />
  <div>{{ $f('Hello, {msg}!', { msg: 'Vue' }) }}</div>

  <div>
    <div>{{ locale.title }}</div>
  </div>

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
