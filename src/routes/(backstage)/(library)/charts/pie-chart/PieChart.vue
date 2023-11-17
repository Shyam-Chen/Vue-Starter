<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const pieChart = ref();

const dataset = [66, 10, 9];

onMounted(() => {
  // set the dimensions and margins of the graph
  // const margin = { top: 100, right: 50, bottom: 120, left: 200 };
  const width = 960;
  const height = 400;

  // append the svg object to the body of the page
  const svg = d3
    .select(pieChart.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 960 400')
    .attr('preserveAspectRatio', 'xMinYMin')
    .style('position', 'relative')
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const g = svg.append('g').attr('transform', 'translate(0, 0)');
  const pie = d3.pie().value((val) => Number(val));

  const colors: any = d3.scaleOrdinal(['#0ea5e9', '#f59e0b', '#10b981']);

  const tooltip = d3
    .select(pieChart.value)
    .append('div')
    .style('display', 'none')
    .attr('class', 'tooltip');

  g.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', d3.arc<d3.PieArcDatum<any>>().innerRadius(0).outerRadius(109))
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr('fill', colors)
    /**
     * tooltip
     */
    .on('mouseover', function () {
      tooltip.style('opacity', 0.8).style('display', 'block');
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

  /**
   * legend
   */
  const legend = svg.append('g').attr('transform', 'translate(180, 50)');

  legend
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('r', 7)
    .attr('cy', (v, i) => {
      return i * 20 + 5;
    })
    .attr('fill', colors);

  legend
    .selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text((v) => {
      return v;
    })
    .attr('x', 15)
    .attr('y', (v, i) => {
      return i * 20 + 10;
    })
    .attr('font-size', '0.8em')
    .attr('text-auchor', 'middle');
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
