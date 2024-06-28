<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useDark } from '@vueuse/core';
import { createHighlighterCore } from 'shiki/core';

import Card from '../card/Card.vue';
import useHighlighter from './useHighlighter';

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: 'html' | 'scss' | 'ts' | 'vue';
  }>(),
  {
    code: '',
    language: 'vue',
  },
);

const isDark = useDark();

const highlighter = useHighlighter();

onBeforeMount(async () => {
  if (highlighter.state.core) return;

  highlighter.state.core = await createHighlighterCore({
    themes: [import('shiki/themes/github-dark.mjs'), import('shiki/themes/github-light.mjs')],
    langs: [
      import('shiki/langs/html.mjs'),
      import('shiki/langs/scss.mjs'),
      import('shiki/langs/typescript.mjs'),
      import('shiki/langs/vue.mjs'),
    ],
    loadWasm: import('shiki/wasm'),
  });
});
</script>

<template>
  <Card class="overflow-x-auto my-4">
    <div
      class="w-fit px-4 lg:px-6"
      v-html="
        highlighter.state.core?.codeToHtml(props.code, {
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
