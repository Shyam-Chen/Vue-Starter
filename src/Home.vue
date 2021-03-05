<script setup>
import { useState } from '~/core/store.js';

const state = useState();

console.log('state =', state);

console.log('import.meta.env =', import.meta.env);

function add() {
  state.foo += '123+';
}
</script>

<template>
  <img alt="Vue logo" src="~/assets/logo.png" />
  <div>{{ $f('Hello, {msg}!', { msg: 'Vue' }) }}</div>
  <router-link :to="{ name: 'helloWorld' }" class="text-blue-500">Hello World</router-link>

  <div>
    <div>{{ state.foo }}</div>
    <button @click="add">Add 123+</button>
  </div>
</template>
