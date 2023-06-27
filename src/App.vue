<script lang="ts" setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { useLocaler } from 'vue-localer';
import { useNavigatorLanguage, useDark } from '@vueuse/core';

import Layout from 'virtual:vue-routes/Layout';

const { lang, langs } = useLocaler();
const { language } = useNavigatorLanguage();
useDark();

watch(
  language,
  (val) => {
    if (val) {
      const _language = localStorage.getItem('language');

      if (_language) {
        lang.value = _language;
        return;
      }

      const found = langs.value.find((item) => item.startsWith(val) || val.startsWith(item));

      if (found) {
        lang.value = found;
        return;
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
