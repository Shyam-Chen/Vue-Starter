<script setup>
import { useLocaler, useLocale } from '~/vue-localer';

import { useState } from '~/core/store.js';

const state = useState();
const localer = useLocaler();
const locale = useLocale();

function add() {
  state.foo += '123+';
}

function changeLang2(event) {
  localer.dispatch('setLanguage', event.target.value);
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

  <div>
    <div>vue-localer</div>

    <div>{{ locale.title }}</div>

    <select :value="localer.state.lang" @change="changeLang2" name="lang" id="lang">
      <option value="en-US">American English</option>
      <option value="ja-JP">日本語</option>
      <option value="zh-TW">正體中文</option>
    </select>
  </div>
</template>
