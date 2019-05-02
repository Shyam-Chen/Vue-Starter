<template>
  <v-layout column class="my-1">
    <div class="title mb-2">Computed Properties</div>

    <div>
      <div>Existing quantity: {{ existingQuantity.toLocaleString('en-US') }}</div>
      <div>Required quantity: {{ requiredQuantity.toLocaleString('en-US') }}</div>
      <div>Percentage: {{ percentage }}%</div>
    </div>
  </v-layout>
</template>

<script>
// @flow

type Data = {
  existingQuantity: number,
  requiredQuantity: number,
};

export default {
  data(): Data {
    return {
      existingQuantity: 372900,
      requiredQuantity: 435900,
    };
  },
  computed: {
    percentage(): number {
      return Math.round((this.existingQuantity / this.requiredQuantity) * 100);
    },
  },
};
</script>

<style scoped>
</style>
