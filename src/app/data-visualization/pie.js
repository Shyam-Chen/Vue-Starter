export const random = () => Math.floor(Math.random() * 300) + 1;

export default {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br />{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Vanilla', 'Angular', 'React', 'Vue'],
  },
  series: [
    {
      name: 'Frameworks',
      type: 'pie',
      radius: '50%',
      center: ['50%', '50%'],
      data: [
        { value: random(), name: 'Vanilla' },
        { value: random(), name: 'Angular' },
        { value: random(), name: 'React' },
        { value: random(), name: 'Vue' },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
