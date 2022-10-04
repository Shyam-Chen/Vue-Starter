export interface State {
  basicForms: {
    email?: string;
    password?: string;
  };

  errors: Record<string, string>;
}
