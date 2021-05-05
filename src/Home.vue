<script setup>
import { useLocaler, useLocale } from 'vue-localer';

import { useState } from '~/core/store.js';
import logo from '~/assets/logo.png';

const state = useState();
const localer = useLocaler();
const locale = useLocale();

function add() {
  state.foo += '123+';
}

function changeLang(event) {
  localer.dispatch('setLanguage', event.target.value);
}
</script>

<template>
  <img alt="Vue logo" :src="logo" />
  <div>{{ $f('Hello, {msg}!', { msg: 'Vue' }) }}</div>

  <div>
    <div>{{ state.foo }}</div>
    <button @click="add">Add 123+</button>
  </div>

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
</template>
