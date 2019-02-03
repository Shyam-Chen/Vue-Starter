<template>
  <v-layout column class="pa-3">
    <div class="subheading pa-2">Bar Chart</div>
    <ECharts :options="options" :theme="app$.theme" autoresize />
  </v-layout>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts';

/* eslint-disable */
import 'echarts/lib/chart/bar';

import 'echarts/lib/component/dataset';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
/* eslint-enable */

export default {
  components: {
    ECharts,
  },
  data() {
    const random = () => (
      Array(3).fill(null)
        .map(() => Math.round(300 + (Math.random() * 700)) / 10)
    );

    return {
      options: {
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
        ],
        dataset: {
          source: [
            ['Frameworks', 'Male', 'Female', 'Neutral'],
            ['Vanilla', ...random()],
            ['Angular', ...random()],
            ['React', ...random()],
            ['Vue', ...random()],
          ],
        },
        legend: {},
        tooltip: {},
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
