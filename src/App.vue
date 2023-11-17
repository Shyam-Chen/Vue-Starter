<script lang="ts" setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { useLocaler } from 'vue-localer';
import { XNotification } from '@x/ui';
import { useNotification } from '@x/ui';
import { useNavigatorLanguage, useDark } from '@vueuse/core';

const { lang, langs } = useLocaler();
const notification = useNotification();
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
  <RouterView />
  <XNotification :messages="notification.state.messages" :timeouts="notification.state.timeouts" />
</template>
