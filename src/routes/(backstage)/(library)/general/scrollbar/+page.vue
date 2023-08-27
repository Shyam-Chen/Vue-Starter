<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Scrollbar' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Scrollbar</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="scrollbar flex flex-col gap-3 h-100 text-center">
      <div
        v-for="num in 50"
        :key="num"
        class="bg-primary-100 dark:bg-primary-900 text-primary-500 dark:text-primary-300 py-2"
      >
        {{ num }}
      </div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Horizontal</div>

    <div class="scrollbar flex gap-3 text-center">
      <div
        v-for="num in 50"
        :key="num"
        class="bg-primary-100 dark:bg-primary-900 text-primary-500 dark:text-primary-300 px-5 py-2"
      >
        {{ num }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrollbar {
  @apply overflow-auto;
}

/* total width */
.scrollbar::-webkit-scrollbar {
  @apply w-2 h-2 z-999;
}

/* background of the scrollbar except button or resizer */
// .scrollbar::-webkit-scrollbar-track {

// }

/* scrollbar itself */
.scrollbar::-webkit-scrollbar-thumb {
  @apply rounded-xl;
}

/* set button(top and bottom of the scrollbar) */
.scrollbar::-webkit-scrollbar-button {
  @apply hidden;
}

/* scrollbar when element is hovered */
.scrollbar:hover::-webkit-scrollbar-thumb {
  @apply bg-gray-500 dark:bg-gray-500;
}

/* scrollbar when scrollbar is hovered */
// .scrollbar::-webkit-scrollbar-thumb:hover {

// }
</style>
