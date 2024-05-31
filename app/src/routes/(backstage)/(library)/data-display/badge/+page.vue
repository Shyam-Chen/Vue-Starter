<script lang="ts" setup>
import { XBreadcrumb, XCard, XBadge } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Badge' }]" />

  <h1 class="text-4xl font-extrabold my-4">Badge</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex justify-center items-center gap-15">
        <XBadge>
          <div class="w-6 h-6 i-fa-envelope"></div>
        </XBadge>

        <XBadge count="7">
          <div class="w-6 h-6 i-fa-envelope"></div>
        </XBadge>

        <XBadge count="77">
          <div class="w-6 h-6 i-fa-envelope"></div>
        </XBadge>

        <XBadge count="99+">
          <div class="w-6 h-6 i-fa-envelope"></div>
        </XBadge>
      </div>

      <div class="flex justify-center items-center gap-15 mt-6">
        <XBadge>
          <div>Link something</div>
        </XBadge>
      </div>
    </XCard>
  </section>
</template>
