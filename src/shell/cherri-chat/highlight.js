/* eslint-disable */
// @flow

const escapeRegExp = (str: string): string => {
  return str.replace('/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g', '\\$&');
};

export default (str: string, search: string): string => {
  if (!search) return str;
  const regex = new RegExp(escapeRegExp(search), 'gi');
  return str.replace(regex, match => `<mark>${match}</mark>`);
};
