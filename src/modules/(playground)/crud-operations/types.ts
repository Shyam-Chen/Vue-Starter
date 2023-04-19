export interface TodoItem {
  _id?: string;
  title?: string;
  completed?: boolean;
}

// enum Filter {
//   All,
//   Active,
//   Completed,
// }

export interface State {
  searchConditions: {
    title?: string;
    filter?: number;
  };

  loading: boolean;

  dataSource: TodoItem[];
  dataCount: number;

  todoItem: TodoItem;

  errors: Record<string, string>;
}
