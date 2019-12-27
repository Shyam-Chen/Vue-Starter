<template>
  <v-layout column class="pa-3">
    <div class="subheading pa-2">Pie Chart</div>
    <ECharts :options="options" :theme="app$.theme" autoresize />
  </v-layout>
</template>

<script>
import ECharts from 'vue-echarts';

import 'echarts/lib/chart/pie';

import 'echarts/lib/component/dataset';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

export default {
  components: {
    ECharts,
  },
  data() {
    const random = () => Math.floor(Math.random() * 300) + 1;

    return {
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br />{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Vanilla', 'Angular', 'React', 'Vue'],
        },
        series: [
          {
            name: 'Frameworks',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: [
              { value: random(), name: 'Vanilla' },
              { value: random(), name: 'Angular' },
              { value: random(), name: 'React' },
              { value: random(), name: 'Vue' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
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
