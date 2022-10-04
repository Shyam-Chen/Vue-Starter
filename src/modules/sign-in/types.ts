export interface State {
  signInForm: {
    username?: string;
    password?: string;
  };

  errors: Record<string, string>;
}
