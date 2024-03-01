<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref, computed } from 'vue';
import { XBreadcrumb, XCard, XButton, XTour } from '@x/ui';

const open = ref(false);
const step = ref(0);

const el1 = ref();
const el2 = ref();
const el3 = ref();
const el4 = ref();

const steps = computed<ComponentProps<typeof XTour>['steps']>(() => [
  {
    title: `What is Vue?`,
    content: `Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces.`,
    target: el1,
  },
  {
    title: `The Progressive Framework`,
    content: `Vue is a framework and ecosystem that covers most of the common features needed in frontend development.`,
    target: el2,
  },
  {
    title: `Single-File Components`,
    content: `In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called Single-File Component (also known as *.vue files, abbreviated as SFC).`,
    target: el3,
  },
  {
    title: `Composition API`,
    content: `With Composition API, we define a component's logic using imported API functions. In SFCs, Composition API is typically used with <script setup>.`,
    target: el4,
  },
]);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Tours' }]" />

  <h1 ref="el1" class="text-4xl font-extrabold my-4">Tours</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XButton label="Begin Tour" @click="open = true" />
      <XTour v-model:open="open" v-model:step="step" :steps="steps" />
    </XCard>
  </section>

  <div role="status" class="my-7 animate-pulse">
    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
    <span class="sr-only">Loading...</span>
  </div>

  <div
    ref="el2"
    class="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"
  >
    <div class="i-bi-image-alt w-12 h-12 text-gray-200"></div>
  </div>

  <div role="status" class="my-6 animate-pulse">
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
    <span class="sr-only">Loading...</span>
  </div>

  <div role="status" class="my-6 animate-pulse">
    <div ref="el3" class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <span class="sr-only">Loading...</span>
  </div>

  <div role="status" class="mb-6 mt-7 animate-pulse">
    <div ref="el4" class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
