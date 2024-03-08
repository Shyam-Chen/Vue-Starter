export type ColumnItem = {
  key: string;
  name: string;
  sortable?: boolean;
  spanable?: boolean;
  sticky?: string | 'left' | 'right';
  class?: unknown;
  classColumn?: unknown;
  classCell?: unknown;
};

export type Control = {
  rows?: number;
  page?: number;
  field?: string;
  direction?: string;
};
