export type TodoItem = {
  _id?: string;
  title?: string;
  completed?: boolean;
};

export type State = {
  todo: TodoItem;
  todoLoading: boolean;
  todoForm: TodoItem;
  todoValdn: Record<keyof TodoItem, string> | Record<string, string>;
  todoSending: boolean;
  todoSent: boolean;
};
