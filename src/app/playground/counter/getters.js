// @flow

import { ICounter } from './constants';

export default {
  evenOrOdd: (state: ICounter): string => (state.value % 2 === 0 ? 'even' : 'odd'),
};
