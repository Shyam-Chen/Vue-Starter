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
const localer = useLocaler();
const locale = useLocale();

function changeLang(event) {
  localer.dispatch('setLanguage', event.target.value);
}
</script>

<template>
  <div>{{ state.count }}</div>
  <div>{{ computeds.evenOrOdd.value }}</div>
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
    <div class="text-2xl">Windi CSS + Iconify</div>

    <!-- flat-color-icons:google -->
    <icon-flatColorIcons-google class="w-10 h-10" />

    <!-- flat-ui:google -->
    <icon-flatUi-google class="w-10 h-10" />

    <!-- vscode-icons:file-type-node -->
    <icon-vscodeIcons-fileTypeNode class="w-10 h-10" />
  </div>

  <Dialog v-model="dialog" />
</template>
