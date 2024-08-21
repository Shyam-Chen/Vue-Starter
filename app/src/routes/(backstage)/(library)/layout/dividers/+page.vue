<script lang="ts" setup>
import { XBreadcrumb, XCard, XCode, XDivider } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'Divider' }]" />

  <h1 class="text-4xl font-extrabold my-4">Divider</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Horizontal</h2>

    <XCard>
      <div>Text</div>
      <XDivider />
      <div>Text</div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Vertical</h2>

    <XCard>
      <div class="flex">
        <div>Text</div>
        <XDivider orientation="vertical" />
        <div>Text</div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">
      Horizontal <XCode class="align-middle">divide-x</XCode>
    </h2>

    <XCard>
      <div class="flex divide-x divide-gray-200 dark:divide-gray-700">
        <div v-for="num in 5" :key="num" class="flex-1 px-4 py-2">
          {{ num }}
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">
      Vertical <XCode class="align-middle">divide-y</XCode>
    </h2>

    <XCard>
      <div class="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        <div v-for="num in 5" :key="num" class="flex-1 px-4 py-2">
          {{ num }}
        </div>
      </div>
    </XCard>
  </section>
</template>
