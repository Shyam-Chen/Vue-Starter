<template>
  <div class="headline">{{ label }}</div>
</template>

<script>
// @flow

export default {
  props: {
    label: {
      type: String,
      default: 'Awesome Title',
    },
  },
};
</script>

<style scoped>
</style>
