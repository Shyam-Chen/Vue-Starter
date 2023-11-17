<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const pieChart = ref();

const data = [
  { category: 'A', value: 26, lineValue: 72 },
  { category: 'B', value: 50, lineValue: 44 },
  { category: 'C', value: 20, lineValue: 60 },
  { category: 'D', value: 20, lineValue: 31 },
  { category: 'E', value: 73, lineValue: 12 },
  { category: 'F', value: 59, lineValue: 91 },
  { category: 'G', value: 88, lineValue: 34 },
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
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', line);

  // Add axes
  svg
    .append('g')
    .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
    .call(d3.axisBottom(xScale));

  svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',0)')
    .call(d3.axisLeft(yScale));

  // Legend
  // const legend = svg
  //   .selectAll('.legend')
  //   .data(data)
  //   .enter()
  //   .append('g')
  //   .attr('class', 'legend')
  //   .attr('transform', (d: any, i: number) => `translate(0,${i * 20})`);

  // legend
  //   .append('rect')
  //   .attr('x', width / 2 - 18)
  //   .attr('width', 18)
  //   .attr('height', 18)
  //   .style('fill', (d, i) => color(String(i)));

  // legend
  //   .append('text')
  //   .attr('x', width / 2 - 24)
  //   .attr('y', 9)
  //   .attr('dy', '.35em')
  //   .style('text-anchor', 'end')
  //   .text((d: any) => d.label);

  // Tooltip
  // const tooltip = d3
  //   .select(pieChart.value)
  //   .append('div')
  //   .style('display', 'none')
  //   .attr('class', 'tooltip');

  // svg
  //   .on('mouseover', function () {
  //     tooltip.style('opacity', 1).style('display', 'block');
  //     d3.select(this).style('opacity', 0.5);
  //   })
  //   .on('mousemove', function (event, d) {
  //     const formater = d3.format(',');
  //     tooltip
  //       .html(formater(d.value))
  //       .style('top', event.pageY - 10 + 'px')
  //       .style('left', event.pageX + 10 + 'px');
  //   })
  //   .on('mouseleave', function () {
  //     tooltip.style('opacity', 0);
  //     d3.select(this).style('opacity', 1);
  //   });
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
