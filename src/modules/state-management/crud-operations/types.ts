export interface TodoItem {
  _id?: string;
  title?: string;
  completed?: boolean;
}

export interface State {
  searchConditions: Omit<TodoItem, '_id'>;

  dataSource: TodoItem[];
  dataCount: number;

  todoItem: TodoItem;

  errors: Record<string, string>;
}
