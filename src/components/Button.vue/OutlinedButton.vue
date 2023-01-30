<script lang="ts" setup>
import TextButton from './TextButton.vue';
</script>

<template>
  <TextButton v-bind="$attrs" class="important:border-current">
    <slot></slot>
  </TextButton>
</template>
