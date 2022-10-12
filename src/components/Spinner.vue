<script lang="ts" setup>
</script>

<template>
  <div
    class="animate-spin inline-block border-gray-300 border-r-blue-600 rounded-full"
    :class="{ 'w-8 h-8 border-4': false }"
    role="status"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>
