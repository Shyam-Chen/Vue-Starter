<script setup>
import { useLocaler, useLocale } from '~/vue-localer';

import { injectLanguage } from '~/core/localer';
import enUS from './locales/en-US.js';

const localer = useLocaler();
const locale = useLocale('helloWorld');

if (!localer.hasModule('helloWorld')) {
  localer.registerModule(['helloWorld'], {
    namespaced: true,
    state: {
      locale: enUS,
    },
    mutations: {
      injectLanguage,
    },
  });
}

localer.dispatch('initialLanguage', 'hello-world');
</script>

<template>
  <div>HelloWorld</div>
  <pre>{{ locale }}</pre>
  <div>{{ locale.msg }}</div>
  <div>{{ $f(locale.say, { msg: 'Vue' }) }}</div>
</template>
