// @flow

import { ICounter } from './types';

export const INITIAL: ICounter = {
  value: 0,
  step: 1,
  stepList: [...Array(10).fill(1).map((x, y) => x + y)],
};
