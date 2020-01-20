<template>
  <v-container id="data-visualization" class="shell-container" fluid>
    <v-layout column>
      <div class="headline">Data Visualization</div>

      <LineChart />
      <BarChart />
      <PieChart />

      <div>Scatter</div>
      <div>Map</div>
      <div>...</div>
    </v-layout>
  </v-container>
</template>

<script>
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';

export default {
  components: {
    LineChart,
    BarChart,
    PieChart,
  },
};
</script>
