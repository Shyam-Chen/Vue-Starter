// @flow

export default (value: number, precision?: number = 1): string => {
  if (!value) return '';

  const dictionary: Array<{ max: number, type: string }> = [
    { max: 1024, type: 'B' },
    { max: 1048576, type: 'KB' },
    { max: 1073741824, type: 'MB' },
    { max: 1.0995116e12, type: 'GB' },
  ];

  const format = dictionary.find(d => value < d.max) || dictionary[dictionary.length - 1];
  const calc = value / (format.max / 1024);
  const tho = 10 ** precision;
  const num = Math.round(calc * tho) / tho;

  return `${num} ${format.type}`;
};
