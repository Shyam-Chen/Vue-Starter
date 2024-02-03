import type { ComponentProps } from 'vue-component-type-helpers';
import { XTable } from '@x/ui';

export interface TodoItem {
  _id?: string;
  title?: string;
  completed?: boolean;
}

export interface State {
  searchForm: {
    title?: string;
    filter?: number;
  };

  todosLoading: boolean;
  todosRows: TodoItem[];
  todosCount: number;
  todosControl: {};

  deleteDialog: boolean;
  deleteExpected: TodoItem['title'];
  deleteContent: TodoItem;
  deleteLoading: boolean;
}

export type XTableProps = ComponentProps<typeof XTable>;
