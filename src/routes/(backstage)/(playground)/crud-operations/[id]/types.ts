export interface TodoItem {
  _id?: string;
  title?: string;
  completed?: boolean;
}

export interface State {
  todoLoading: boolean;
  todoForm: TodoItem;
  todoValdn: Record<keyof TodoItem, string> | Record<string, string>;
  todoSending: boolean;
  todoSent: boolean;
}
