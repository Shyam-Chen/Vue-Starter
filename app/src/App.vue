<script lang="ts" setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { useLocaler } from 'vue-localer';
import { XNotification } from '@x/ui';
import { useNavigatorLanguage, useDark } from '@vueuse/core';

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
