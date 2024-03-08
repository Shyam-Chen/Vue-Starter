<script lang="ts" setup>
defineProps<{
  src?: string;
  icon?: string;
}>();
</script>

<template>
  <img v-if="src" v-bind="$attrs" :src="src" class="Avatar" />

  <div v-else-if="icon" v-bind="$attrs" class="Avatar">
    <div class="w-7 h-7" :class="icon"></div>
  </div>

  <div v-else v-bind="$attrs" class="Avatar">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.Avatar {
  @apply min-w-10 min-h-10 w-10 h-10 rounded-full flex justify-center items-center;
}
</style>
