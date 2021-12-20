<script setup>
import { useLocaler, useLocale } from 'vue-localer';

import enUS from './_locales/en-US.js';

const localer = useLocaler();
const locale = useLocale('helloWorld');

if (!localer.hasModule('helloWorld')) {
  localer.register('helloWorld', { locale: enUS });
}

localer.dispatch('initialLanguage', 'helloWorld');
</script>

<template>
  <div>HelloWorld</div>
  <pre>{{ locale }}</pre>
  <div>{{ locale.msg }}</div>
  <div>{{ $f(locale.say, { msg: 'Vue' }) }}</div>
</template>
