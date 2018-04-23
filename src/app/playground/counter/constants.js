// @flow

export interface ICounter {
  value: number;
  step: number;
  stepList: number[];
}

export interface IContent {
  state: ICounter;
  commit(mutation: string, payload?: any): void;
  dispatch(action: string): void;
}

export const INITIAL: ICounter = {
  value: 0,
  step: 1,
  stepList: [...Array(10).fill(1).map((x, y) => x + y)],
};
