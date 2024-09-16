<script lang="ts" setup>
import { XBreadcrumb, XButton, XCard } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Card' }]" />

  <h1 class="text-4xl font-extrabold my-4">Card</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard class="max-w-sm my-4">
      <template #title>
        <div>Noteworthy technology acquisitions</div>
      </template>

      <template #subtitle>
        <div>2021/10/01 ~ 2021/10/31</div>
      </template>

      <div>
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </div>

      <template #footer>
        <XButton>Action</XButton>
      </template>
    </XCard>

    <XCard class="max-w-sm my-4">
      <template #header>
        <div class="aspect-16/9 bg-gray-200 rounded-t-lg flex justify-center items-center">
          aspect-16/9
        </div>
      </template>

      <template #title>
        <div>Noteworthy technology acquisitions</div>
      </template>

      <template #subtitle>
        <div>2021/10/01 ~ 2021/10/31</div>
      </template>

      <div>
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </div>

      <template #footer>
        <XButton>Action</XButton>
      </template>
    </XCard>

    <XCard class="max-w-lg flex my-4">
      <template #header>
        <div class="w-50 h-full bg-gray-200 rounded-l-lg flex justify-center items-center"></div>
      </template>

      <template #title>
        <time class="text-sm text-zinc-400 font-normal">2021/10/01 ~ 2021/10/31</time>
        <div>Noteworthy technology acquisitions</div>
      </template>

      <template #subtitle>
        <div>Card subtitle</div>
      </template>

      <div>
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </div>

      <template #footer>
        <XButton>Action</XButton>
      </template>
    </XCard>
  </section>
</template>
