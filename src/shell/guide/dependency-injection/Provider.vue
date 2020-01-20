<template>
  <v-layout column class="mt-1 mb-1">
    <slot></slot>
  </v-layout>
</template>

<script>
export default {
  provide() {
    return {
      text: 'Go Go Summer!',
    };
  },
};
</script>
