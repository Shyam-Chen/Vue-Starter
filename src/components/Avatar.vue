<script lang="ts" setup>
defineProps<{
  src?: string;
  icon?: string;
}>();
</script>

<template>
  <img v-if="src" v-bind="$attrs" :src="src" class="w-10 h-10 rounded-full" />

  <div
    v-else-if="icon"
    v-bind="$attrs"
    class="w-10 h-10 rounded-full flex justify-center items-center"
  >
    <div class="w-7 h-7" :class="icon"></div>
  </div>

  <div v-else v-bind="$attrs" class="w-10 h-10 rounded-full flex justify-center items-center">
    <slot></slot>
  </div>
</template>
