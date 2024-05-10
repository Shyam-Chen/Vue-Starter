export type Node = {
  label?: string;
  value?: unknown;
  children?: Node[];
  level?: number;
  status?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
};
