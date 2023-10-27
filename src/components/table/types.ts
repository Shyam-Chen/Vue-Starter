export type ColumnItem = {
  key: string;
  name: string;
  sortable?: boolean;
  spanable?: boolean;
  sticky?: 'left' | 'right';
};

export type Control = {
  rows?: number;
  page?: number;
  field?: string;
  direction?: string;
};
