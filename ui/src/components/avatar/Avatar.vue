<script lang="ts" setup>
defineProps<{
  src?: string;
  icon?: string;
}>();
</script>

<template>
  <img v-if="src" v-bind="$attrs" :src="src" class="Avatar-Image" />

  <div v-else-if="icon" v-bind="$attrs" class="Avatar-Icon">
    <div class="w-7 h-7" :class="icon"></div>
  </div>

  <div v-else v-bind="$attrs" class="Avatar-Text">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.Avatar-Image {
  @apply w-10 h-10 rounded-full;
}

.Avatar-Icon {
  @apply w-10 h-10 rounded-full flex justify-center items-center;
}

.Avatar-Text {
  @apply w-10 h-10 rounded-full flex justify-center items-center;
}
</style>
