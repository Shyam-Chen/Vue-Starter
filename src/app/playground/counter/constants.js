// @flow

export interface ICounter {
  value: number;
}

export interface IContent {
  commit(mutation: string): void;
  state: ICounter;
}

export const INITIAL: ICounter = {
  value: 0,
};
