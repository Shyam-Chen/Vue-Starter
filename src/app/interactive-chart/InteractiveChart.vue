<template>
  <v-container fluid>
    <v-layout column>
      <div class="headline">Interactive Chart</div>

      <ECharts :options="bar" :theme="$app.theme" auto-resize />
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import 'echarts/lib/chart/bar';

import 'echarts/lib/component/dataset';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
/* eslint-enable */

import ECharts from 'vue-echarts/components/ECharts';

import bar from './bar';

export default {
  components: {
    ECharts,
  },
  data() {
    return {
      bar: bar(),
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
