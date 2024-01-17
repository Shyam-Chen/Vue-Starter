<script lang="ts" setup>
import { XBreadcrumb, XCard, XTooltip } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tooltip' }]" />

  <h1 class="text-4xl font-extrabold my-4">Tooltip</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTooltip title="Hi! I'm tooltip">
        <span>Tooltip will show on mouse enter.</span>
      </XTooltip>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Placement</h2>

    <XCard>
      <div class="flex flex-col gap-16">
        <div class="flex justify-between">
          <XTooltip v-for="num in 2" :key="num" title="Hi! I'm tooltip">
            <span>Tooltip will show on mouse enter.</span>
          </XTooltip>
        </div>

        <div class="flex justify-center">
          <XTooltip title="Hi! I'm tooltip">
            <span>Tooltip will show on mouse enter.</span>
          </XTooltip>
        </div>

        <div class="flex justify-between">
          <XTooltip v-for="num in 3" :key="num" title="Hi! I'm tooltip">
            <span>Tooltip will show on mouse enter.</span>
          </XTooltip>
        </div>

        <div class="flex justify-center">
          <XTooltip title="Hi! I'm tooltip">
            <span>Tooltip will show on mouse enter.</span>
          </XTooltip>
        </div>
      </div>
    </XCard>
  </section>
</template>
