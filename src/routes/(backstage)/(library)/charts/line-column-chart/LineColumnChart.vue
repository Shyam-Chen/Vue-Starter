<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const pieChart = ref();

const data = [
  { category: 'Sun', value: 26, lineValue: 72 },
  { category: 'Mon', value: 50, lineValue: 44 },
  { category: 'Tue', value: 20, lineValue: 60 },
  { category: 'Wed', value: 20, lineValue: 31 },
  { category: 'Thu', value: 73, lineValue: 12 },
  { category: 'Fri', value: 59, lineValue: 91 },
  { category: 'Sat', value: 88, lineValue: 34 },
];

onMounted(() => {
  const width = 960;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  // Create SVG element
  const svg = d3
    .select(pieChart.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 960 400')
    .style('position', 'relative');
  // .append('g')
  // .attr('transform', `translate(${width / 2},${height / 2})`);

  const tooltip = d3
    .select(pieChart.value)
    .append('div')
    .style('display', 'none')
    .attr('class', 'tooltip');

  // Set up scales
  const xScale = d3
    .scaleBand()
    .domain(
      data.map(function (d) {
        return d.category;
      }),
    )
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return Math.max(d.value, d.lineValue);
      }) || 0,
    ])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Draw columns
  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('fill', '#6366f1')
    .attr('x', function (d) {
      return xScale(d.category) as any;
    })
    .attr('width', xScale.bandwidth())
    .attr('y', function (d) {
      return yScale(d.value);
    })
    .attr('height', function (d) {
      return height - margin.bottom - yScale(d.value);
    });

  svg
    .selectAll('.bar')
    .on('mouseover', function () {
      tooltip.style('display', 'block');
      d3.select(this).style('opacity', 0.5);
    })
    .on('mousemove', function (event, d: any) {
      tooltip
        .html(`Category: ${d.category}<br>Value: ${d.value}<br>LineValue: ${d.lineValue}`)
        .style('top', event.pageY - 10 + 'px')
        .style('left', event.pageX + 10 + 'px');
    })
    .on('mouseleave', function () {
      tooltip.style('display', 'none');
      d3.select(this).style('opacity', 1);
    });

  // Draw line
  const line: any = d3
    .line()
    .x(function (d: any) {
      return (xScale(d.category) as any) + xScale.bandwidth() / 2;
    })
    .y(function (d: any) {
      return yScale(d.lineValue);
    });

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#ec4899')
    .attr('stroke-width', 4)
    .attr('d', line);

  svg
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', function (d: any) {
      return (xScale(d.category) as any) + xScale.bandwidth() / 2;
    })
    .attr('cy', function (d: any) {
      return yScale(d.lineValue);
    })
    .attr('r', 6)
    .style('fill', '#ec4899');

  svg
    .selectAll('.dot')
    .on('mouseover', function () {
      tooltip.style('display', 'block');
      d3.select(this).style('opacity', 0.5);
    })
    .on('mousemove', function (event, d: any) {
      tooltip
        .html(`Category: ${d.category}<br>Value: ${d.value}<br>LineValue: ${d.lineValue}`)
        .style('top', event.pageY - 10 + 'px')
        .style('left', event.pageX + 10 + 'px');
    })
    .on('mouseleave', function () {
      tooltip.style('display', 'none');
      d3.select(this).style('opacity', 1);
    });

  // Add axes
  svg
    .append('g')
    .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
    .call(d3.axisBottom(xScale));

  svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',0)')
    .call(d3.axisLeft(yScale));
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
