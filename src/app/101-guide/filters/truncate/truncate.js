// @flow

export default (value: string, length?: number = 15): string => {
  if (!value) return '';
  if (value.length <= length) return value;
  return `${value.substring(0, length)}...`;
};
