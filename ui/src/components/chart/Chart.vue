<script lang="ts" setup>
import EChart from 'vue-echarts';
import { useColorMode } from '@vueuse/core';
import { use } from 'echarts/core';
import { LegendComponent, GridComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

use([LegendComponent, GridComponent, TooltipComponent, SVGRenderer]);

const colorMode = useColorMode();
</script>

<template>
  <EChart v-bind="$attrs" :theme="colorMode" autoresize class="Chart" />
</template>

<style lang="scss" scoped>
.Chart :deep(svg > rect) {
  @apply !fill-transparent;
}
</style>
