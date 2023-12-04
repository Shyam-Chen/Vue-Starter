<script lang="ts" setup>
import { XBreadcrumb, XCard, XButton } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Card' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Card</div>
  </div>

  <XCard class="max-w-sm">
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

  <XCard class="max-w-sm">
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

  <XCard class="max-w-lg flex">
    <template #header>
      <div class="w-50 h-full bg-gray-200 rounded-l-lg flex justify-center items-center"></div>
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
</template>
