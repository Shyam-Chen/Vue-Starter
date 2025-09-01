<script lang="ts" setup>
// import { useDark } from '@vueuse/core';
import MarkdownIt from 'markdown-it';
import { computed, onBeforeMount } from 'vue';

// import { fromHighlighter } from '@shikijs/markdown-it/core';
// import { bundledLanguages, createHighlighter } from 'shiki/bundle/full';

// import useHighlighter from './useHighlighter';

const props = withDefaults(
  defineProps<{
    content?: string;
  }>(),
  {
    content: '',
  },
);

// const isDark = useDark();

// const highlighter = useHighlighter();

onBeforeMount(async () => {
  // if (highlighter.state.core) return;
  //
  // highlighter.state.core = await createHighlighter({
  //   langs: Object.keys(bundledLanguages),
  //   themes: [import('shiki/themes/github-dark.mjs'), import('shiki/themes/github-light.mjs')],
  // });
});

const renderedMarkdown = computed(() => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  });

  // if (highlighter.state.core) {
  //   md.use(
  //     fromHighlighter(highlighter.state.core, {
  //       theme: isDark.value ? 'github-dark' : 'github-light',
  //       fallbackLanguage: 'ts',
  //     }),
  //   );
  // }

  return md.render(props.content);
});
</script>

<template>
  <div class="MarkdownRenderer" v-html="renderedMarkdown"></div>
</template>

<style lang="scss" scoped>
.MarkdownRenderer {
  > :deep(:first-child) {
    @apply !mt-1;
  }

  > :deep(:last-child) {
    @apply !mb-1;
  }
}

/** p */
:deep(p) {
  @apply my-5;
}

/** h1 */
:deep(h1) {
  @apply mt-2 mb-4 text-4xl font-extrabold;
}

/** h2 */
:deep(h2) {
  @apply mt-2 mb-4 text-3xl font-bold;
}

/** h3 */
:deep(h3) {
  @apply mt-2 mb-4 text-2xl font-semibold;
}

/** h4 */
:deep(h4) {
  @apply mt-2 mb-4 text-xl font-medium;
}

/** ul */
:deep(ul) {
  @apply mt-1 mb-5 list-disc ml-6;
}

:deep(ul > li) {
  @apply my-2;
}

/** ol */
:deep(ol) {
  @apply mt-1 mb-5 list-decimal ml-6;
}

:deep(ol > li) {
  @apply my-2;
}

/** code */
:deep(code:not([class^='language'])) {
  @apply mb-0.5 px-1.5 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap text-gray-700 bg-gray-300 text-sm leading-none align-middle rounded overflow-auto;
}

/** code block */
:deep(pre) {
  @apply max-w-180 overflow-auto;
  @apply my-5 p-4 border border-gray-300 rounded-lg;
}

.dark .MarkdownRenderer {
  :deep(pre) {
    @apply border-gray-500;
  }
}

/** table */
:deep(table) {
  @apply my-5;
}

:deep(thead) {
  @apply text-gray-800 bg-gray-200;
}

:deep(th) {
  @apply px-2.5 py-1.5 border;
}

:deep(td) {
  @apply px-2.5 py-1.5 border;
}

.dark .MarkdownRenderer {
  :deep(thead) {
    @apply text-gray-300 bg-gray-700;
  }

  :deep(th) {
    @apply border-gray-500;
  }

  :deep(td) {
    @apply border-gray-500;
  }
}

/** a */
:deep(a) {
  @apply text-primary-500 hover:underline hover:text-primary-600;
}

/** blockquote */
:deep(blockquote) {
  @apply px-2 border-l-4 border-slate-500;
}
</style>
