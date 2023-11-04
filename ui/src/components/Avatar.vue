<script lang="ts" setup>
defineProps<{
  src?: string;
  icon?: string;
}>();
</script>

<template>
  <img v-if="src" v-bind="$attrs" :src="src" class="avatar-image" />

  <div v-else-if="icon" v-bind="$attrs" class="avatar-icon">
    <div class="w-7 h-7" :class="icon"></div>
  </div>

  <div v-else v-bind="$attrs" class="avatar-text">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.avatar-image {
  @apply w-10 h-10 rounded-full;
}

.avatar-icon {
  @apply w-10 h-10 rounded-full flex justify-center items-center;
}

.avatar-text {
  @apply w-10 h-10 rounded-full flex justify-center items-center;
}
</style>
