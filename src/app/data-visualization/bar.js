export const random = () => (
  Array(3).fill(null)
    .map(() => Math.round(300 + (Math.random() * 700)) / 10)
);

export default {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['Frameworks', 'Male', 'Female', 'Neutral'],
      ['Vanilla', ...random()],
      ['Angular', ...random()],
      ['React', ...random()],
      ['Vue', ...random()],
    ],
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [
    { type: 'bar' },
    { type: 'bar' },
    { type: 'bar' },
  ],
};
