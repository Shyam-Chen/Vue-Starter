// @flow

import { ICounter } from './types';

// computed
export default {
  evenOrOdd(state: ICounter): string {
    return state.value % 2 === 0 ? 'even' : 'odd';
  },
};
