// @flow

import { ICounter } from './constants';

export default {
  evenOrOdd(state: ICounter): string {
    return state.value % 2 === 0 ? 'even' : 'odd';
  },
};
