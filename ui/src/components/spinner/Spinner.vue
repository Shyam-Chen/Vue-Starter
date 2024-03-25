<script lang="ts" setup>
import { ref } from 'vue';

const spinnerWrapper = ref();
const spinner = ref();
</script>

<template>
  <div ref="spinnerWrapper" v-bind="$attrs" :class="{ 'size-8': !$attrs.hasOwnProperty('class') }">
    <div
      ref="spinner"
      class="spinner"
      :style="{ 'border-width': spinnerWrapper ? `${spinnerWrapper.offsetWidth / 8}px` : '0' }"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  @apply animate-spin inline-block w-full h-full border-gray-300 border-r-primary-500 rounded-full;
}
</style>
