<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const barChart = ref();

onMounted(() => {
  // set the dimensions and margins of the graph
  const margin = { top: 100, right: 50, bottom: 120, left: 200 };
  const width = 960 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select(barChart.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 960 400')
    .attr('preserveAspectRatio', 'xMinYMin')
    .style('position', 'relative')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // parse the Data
  d3.csv(
    'https://raw.githubusercontent.com/GDS-ODSSS/unhcr-dataviz-platform/master/data/comparison/bar_grouped.csv',
  ).then(function (data) {
    const sumbyRegionYear = d3.rollups(
      data,
      (v) => d3.sum(v, (d): any => d.asylum_application),
      (d) => d.region,
      (d) => d.year,
    );

    const regionKey = Array.from(sumbyRegionYear).map((d) => d[0]);
    const yearKeys = Array.from(Array.from(sumbyRegionYear)[0][1]).map((d) => d[0]);
    const regionKeys = regionKey.sort(d3.ascending);

    // x scale and Axis
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d): any => d.asylum_application))])
      .nice()
      .range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(xScale).tickSize(0).ticks(5).tickPadding(6).tickFormat(d3.format('.1s')))
      .call((d) => d.select('.domain').remove());

    // y scale and Axis
    const yScale = d3.scaleBand().domain(regionKeys).range([0, height]).padding(0.2);
    svg.append('g').call(d3.axisLeft(yScale).tickSize(0).tickPadding(8));

    // set subgroup sacle
    const ySubgroups = d3.scaleBand().domain(yearKeys).range([0, yScale.bandwidth()]).padding(0.05);

    // color palette
    const color = d3.scaleOrdinal().domain(yearKeys).range(['#0072BC', '#8EBEFF']);

    // set vertical grid line
    const GridLine = (): any => d3.axisBottom(xScale);
    svg
      .append('g')
      .attr('class', 'grid')
      .call(GridLine().tickSize(height, 0, 0).tickFormat('').ticks(6));

    // create a tooltip
    const tooltip = d3
      .select(barChart.value)
      .append('div')
      .style('display', 'none')
      .attr('class', 'tooltip');

    // create bars
    svg
      .append('g')
      .selectAll('g')
      .data(sumbyRegionYear)
      .join('g')
      .attr('transform', (d) => 'translate(0, ' + yScale(d[0]) + ')')
      .selectAll('rect')
      .data((d) => {
        return d[1];
      })
      .join('rect')
      .attr('x', xScale(0))
      .attr('y', (d): any => ySubgroups(d[0]))
      .attr('width', (d) => xScale(d[1]))
      .attr('height', ySubgroups.bandwidth())
      .attr('fill', (d): any => color(d[0]))
      .on('mouseover', function () {
        tooltip.style('opacity', 0.8).style('display', 'block');
        d3.select(this).style('opacity', 0.5);
      })
      .on('mousemove', function (event, d) {
        const formater = d3.format(',');
        tooltip
          .html(formater(d[1]))
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseleave', function () {
        tooltip.style('opacity', 0);
        d3.select(this).style('opacity', 1);
      });

    // set legend
    svg
      .append('rect')
      .attr('x', width / 2 - 40)
      .attr('y', height + margin.bottom * 0.3)
      .attr('width', 12)
      .attr('height', 12)
      .style('fill', '#0072BC');
    svg
      .append('text')
      .attr('class', 'legend')
      .attr('x', width / 2 - 25)
      .attr('y', height + margin.bottom * 0.4)
      .text('2019');
    svg
      .append('rect')
      .attr('x', width / 2 + 40)
      .attr('y', height + margin.bottom * 0.3)
      .attr('width', 12)
      .attr('height', 12)
      .style('fill', '#8EBEFF');
    svg
      .append('text')
      .attr('class', 'legend')
      .attr('x', width / 2 + 55)
      .attr('y', height + margin.bottom * 0.4)
      .text('2020');
  });
});
</script>

<template>
  <div ref="barChart" class="BarChart"></div>
</template>

<style lang="scss" scoped>
.BarChart {
  :deep(.legend) {
    @apply fill-slate-500;
  }

  :deep(.tooltip) {
    @apply absolute text-sm text-slate-700 bg-white px-3 py-1 rounded shadow-lg;
  }
}

.dark .BarChart {
  :deep(.legend) {
    @apply fill-slate-400;
  }
}
</style>
