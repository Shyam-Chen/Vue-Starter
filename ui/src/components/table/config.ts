import type { Control } from './types';

export const controlDefaults: Required<Control> = {
  rows: 10,
  page: 1,
  field: 'createdAt',
  direction: 'desc',
};
