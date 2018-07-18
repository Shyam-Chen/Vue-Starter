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
