import { XTable } from '@lyra/ui';
import type { ComponentProps } from 'vue-component-type-helpers';

export type TodoItem = {
  _id?: string;
  title?: string;
  completed?: boolean;
};

export type State = {
  searchForm: {
    title?: string;
    filter?: number;
  };

  todosLoading: boolean;
  todosRows: TodoItem[];
  todosCount: number;
  todosControl: XTableProps['control'];

  deleteDialog: boolean;
  deleteExpected: TodoItem['title'];
  deleteContent: TodoItem;
  deleteLoading: boolean;
};

export type XTableProps = ComponentProps<typeof XTable>;
