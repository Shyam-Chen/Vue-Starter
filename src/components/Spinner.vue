<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

const spinnerWrapper = ref();
const spinner = ref();

onMounted(() => {
  nextTick(() => {
    const size = spinnerWrapper.value.getBoundingClientRect().width / 8;
    spinner.value.style['border-width'] = `${size}px`;
  });
});
</script>

<template>
  <div ref="spinnerWrapper" v-bind="$attrs" :class="{ 'w-8 h-8': !$attrs.hasOwnProperty('class') }">
    <div ref="spinner" class="spinner">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  @apply animate-spin inline-block w-full h-full border-gray-300 border-r-primary-500 rounded-full;
}
</style>
