<template>
  <v-layout column class="pa-3">
    <div class="subheading pa-2">Line Chart</div>
    <ECharts :options="options" :theme="app$.theme" autoresize />
  </v-layout>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts';

/* eslint-disable */
import 'echarts/lib/chart/line';

import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
/* eslint-enable */

export default {
  components: {
    ECharts,
  },
  data() {
    return {
      options: {
        legend: {},
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        }],
      },
    };
  },
  computed: {
    app$() {
      return this.$store.state;
    },
  },
};
</script>

<style scoped>
.echarts {
  width: 100%;
  max-width: 600px;
}
</style>
