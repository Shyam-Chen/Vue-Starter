<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const pieChart = ref();

const dataset: any[] = [
  { label: 'Category A', value: 30 },
  { label: 'Category B', value: 50 },
  { label: 'Category C', value: 20 },
];

onMounted(() => {
  const width = 960;
  const height = 400;

  // Set up the dimensions and radius for the donut chart
  const radius = Math.min(250, 250) / 2;

  // Set up color scale
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Create SVG element
  const svg = d3
    .select(pieChart.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 960 400')
    .style('position', 'relative')
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  // Create arc for the donut chart
  const arc: any = d3
    .arc()
    .innerRadius(radius - 70)
    .outerRadius(radius);

  // Create pie chart layout
  const pie = d3.pie().value((d: any) => d.value);

  // Append arcs to the SVG element
  const arcs = svg.selectAll('arc').data(pie(dataset)).enter().append('g').attr('class', 'arc');

  // Draw arcs
  arcs
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(String(i)));

  // Legend
  const legend = svg
    .selectAll('.legend')
    .data(dataset)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (d: any, i: number) => `translate(0,${i * 20})`);

  legend
    .append('rect')
    .attr('x', width / 2 - 18)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', (d, i) => color(String(i)));

  legend
    .append('text')
    .attr('x', width / 2 - 24)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text((d: any) => d.label);

  // Tooltip
  const tooltip = d3
    .select(pieChart.value)
    .append('div')
    .style('display', 'none')
    .attr('class', 'tooltip');

  arcs
    .on('mouseover', function () {
      tooltip.style('opacity', 1).style('display', 'block');
      d3.select(this).style('opacity', 0.5);
    })
    .on('mousemove', function (event, d) {
      const formater = d3.format(',');
      tooltip
        .html(formater(d.value))
        .style('top', event.pageY - 10 + 'px')
        .style('left', event.pageX + 10 + 'px');
    })
    .on('mouseleave', function () {
      tooltip.style('opacity', 0);
      d3.select(this).style('opacity', 1);
    });
});
</script>

<template>
  <div ref="pieChart" class="PieChart"></div>
</template>

<style lang="scss" scoped>
.PieChart {
  :deep(.legend) {
    @apply fill-slate-500;
  }

  :deep(.tooltip) {
    @apply absolute text-sm text-slate-700 bg-white px-3 py-1 rounded shadow-lg;
  }
}

.dark .PieChart {
  :deep(.legend) {
    @apply fill-slate-400;
  }
}
</style>
