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
</template>
