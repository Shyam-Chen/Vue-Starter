export interface State {
  signInForm: {
    username?: string;
    password?: string;
    email?: string;
  };

  errors: Record<string, string>;
}
