<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { useDark } from '@vueuse/core';
import { getHighlighterCore } from 'shiki/core';
import getWasm from 'shiki/wasm';

import Card from '../card/Card.vue';

const props = defineProps<{
  code?: string;
  language?: 'html' | 'scss' | 'ts';
}>();

const isDark = useDark();

const highlighter = ref();

onBeforeMount(async () => {
  highlighter.value = await getHighlighterCore({
    themes: [import('shiki/themes/github-dark.mjs'), import('shiki/themes/github-light.mjs')],
    langs: [
      import('shiki/langs/html.mjs'),
      import('shiki/langs/scss.mjs'),
      import('shiki/langs/typescript.mjs'),
    ],
    loadWasm: getWasm,
  });
});
</script>

<template>
  <Card class="overflow-x-auto my-4">
    <div
      class="w-fit px-4 lg:px-6"
      v-html="
        highlighter?.codeToHtml(props.code, {
          lang: props.language,
          theme: isDark ? 'github-dark' : 'github-light',
        })
      "
    ></div>
  </Card>
</template>

<style lang="scss" scoped>
:deep(.Card-Body) {
  @apply !px-0;
}
</style>
