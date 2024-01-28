<script lang="ts" setup>
import Avatar from '../avatar/Avatar.vue';
import Button from '../button/Button.vue';
</script>

<template>
  <div class="flex items-start gap-2.5">
    <Avatar class="bg-primary-500 text-white">BG</Avatar>

    <div
      class="flex flex-col w-full max-w-xs leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
    >
      <div class="flex items-center gap-2">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        That's awesome. I think our users will really appreciate the improvements.
      </p>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
    </div>

    <div class="self-center">
      <Button icon="i-material-symbols-more-vert" variant="text" color="secondary" size="small" />
    </div>
  </div>
</template>
