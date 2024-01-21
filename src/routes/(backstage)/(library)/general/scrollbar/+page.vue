<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Scrollbar' }]" />

  <h1 class="text-4xl font-extrabold my-4">Scrollbar</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Vertical</h2>

    <XCard>
      <div class="scrollbar flex flex-col gap-3 h-100 text-center">
        <div
          v-for="num in 50"
          :key="num"
          class="bg-primary-100 dark:bg-primary-900 text-primary-500 dark:text-primary-200 py-2"
        >
          {{ num }}
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Horizontal</h2>

    <XCard>
      <div class="scrollbar flex gap-3 text-center">
        <div
          v-for="num in 50"
          :key="num"
          class="bg-primary-100 dark:bg-primary-900 text-primary-500 dark:text-primary-200 px-5 py-2"
        >
          {{ num }}
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Both</h2>

    <XCard>
      <div class="scrollbar w-full h-80">
        <div class="w-100vw h-100dvh"></div>
      </div>
    </XCard>
  </section>
</template>

<style lang="scss" scoped>
.scrollbar {
  @apply overflow-auto;
}

.scrollbar::-webkit-scrollbar {
  @apply w-2 h-2 z-999;
}

.scrollbar::-webkit-scrollbar-button {
  @apply hidden;
}

.scrollbar::-webkit-scrollbar-thumb {
  @apply rounded-xl bg-gray-400 dark:bg-gray-500;
}

.scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.scrollbar::-webkit-scrollbar-track-piece {
  @apply bg-transparent;
}

.scrollbar::-webkit-scrollbar-corner {
  @apply bg-transparent;
}
</style>
