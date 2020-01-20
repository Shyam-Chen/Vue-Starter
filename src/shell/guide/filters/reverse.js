// @flow

export default (input: any): any => {
  if (typeof input === 'string') {
    return input
      .split('')
      .reverse()
      .join('');
  }

  return Array.isArray(input) ? input.slice().reverse() : input;
};
