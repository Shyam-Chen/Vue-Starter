<script lang="ts" setup>
import { useDark, useNavigatorLanguage } from '@vueuse/core';
import { XNotification } from '@x/ui';
import { watch } from 'vue';
import { useLocaler } from 'vue-localer';
import { RouterView } from 'vue-router';

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
        document.documentElement.lang = _language;
        return;
      }

      const found = langs.value.find((item) => item.startsWith(val) || val.startsWith(item));

      if (found) {
        lang.value = found;
        document.documentElement.lang = found;
        return;
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <RouterView />
  <XNotification />
</template>

<style lang="scss">
html.dark {
  color-scheme: dark;
}
</style>

<style lang="scss">
#nprogress {
  @apply pointer-events-none;

  .bar {
    @apply fixed top-0 left-0 z-1000 w-full h-0.5 bg-primary-500/75;
  }
}
</style>
