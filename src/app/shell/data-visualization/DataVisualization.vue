<template>
  <v-container id="data-visualization" class="shell-container" fluid>
    <v-layout column>
      <div class="headline">Data Visualization</div>

      <div>Line</div>

      <BarChart />
      <PieChart />

      <div>Scatter</div>
      <div>Map</div>
      <div>...</div>
    </v-layout>
  </v-container>
</template>

<script>
import BarChart from './BarChart';
import PieChart from './PieChart';

export default {
  components: {
    BarChart,
    PieChart,
  },
};
</script>

<style scoped>
</style>
