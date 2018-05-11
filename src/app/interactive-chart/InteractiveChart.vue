<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">Interactive Chart</div>

      <v-layout column class="pa-3">
        <div class="subheading pa-2">Bar Chart</div>
        <ECharts :options="bar" :theme="$app.theme" auto-resize />
      </v-layout>

      <v-layout column class="pa-3">
        <div class="subheading pa-2">Pie Chart</div>
        <ECharts :options="pie" :theme="$app.theme" auto-resize />
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

import 'echarts/lib/component/dataset';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

import ECharts from 'vue-echarts/components/ECharts';

import bar from './bar';
import pie from './pie';

export default {
  components: {
    ECharts,
  },
  data() {
    return {
      bar,
      pie,
    };
  },
  computed: {
    $app() {
      return this.$store.state;
    },
  },
};
</script>

<style scoped>
</style>
