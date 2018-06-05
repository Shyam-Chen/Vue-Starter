<template>
  <v-layout column class="mt-1 mb-1">
    <div class="title mb-2">Computed Properties</div>

    <div>
      <div>Existing quantity: {{ existingQuantity.toLocaleString('en-US') }}</div>
      <div>Required quantity: {{ requiredQuantity.toLocaleString('en-US') }}</div>
      <div>Percentage: {{ percentage }}%</div>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      existingQuantity: 372900,
      requiredQuantity: 435900,
    };
  },
  computed: {
    percentage() {
      return Math.round((this.existingQuantity / this.requiredQuantity) * 100);
    },
  },
};
</script>

<style scoped>
</style>
