<template>
  <v-card class="ma-3 o-card">
    <v-list two-line subheader>
      <v-subheader>{{ subheader }}</v-subheader>
      <!-- scoped slot -->
      <slot v-for="item in items" :item="item" name="items"></slot>
    </v-list>
  </v-card>
</template>

<script>
// @flow

export default {
  props: {
    subheader: {
      type: String,
      default: 'Subheader',
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.o-card {
  width: 360px;
}
</style>
