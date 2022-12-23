<script lang="ts" setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { useLocaler } from 'vue-localer';
import { useNavigatorLanguage } from '@vueuse/core';

import Layout from '~/layouts/Layout.vue';

const { lang } = useLocaler();
const { language } = useNavigatorLanguage();

watch(
  language,
  (val) => {
    if (val) {
      const _language = localStorage.getItem('language');

      if (_language) {
        lang.value = _language;
      } else if (val.startsWith('ja')) {
        lang.value = 'ja-JP';
      } else if (val.startsWith('ko')) {
        lang.value = 'ko-KR';
      } else {
        lang.value = val;
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<style>
.highcharts-credits {
  display: none;
}
</style>
