<script lang="ts" setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNavigatorLanguage } from '@vueuse/core';

import Layout from '~/layouts/Layout.vue';

const { locale } = useI18n();
const { language } = useNavigatorLanguage();

watch(
  language,
  (val) => {
    if (val) locale.value = val;
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
