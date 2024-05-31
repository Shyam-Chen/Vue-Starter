<script lang="ts" setup>
import { useColorMode } from '@vueuse/core';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import EChart from 'vue-echarts';

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
