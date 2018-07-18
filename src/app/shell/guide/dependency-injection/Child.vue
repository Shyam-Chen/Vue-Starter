<template>
  <div>
    {{ text }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ['text'],
};
</script>

<style scoped>
</style>
