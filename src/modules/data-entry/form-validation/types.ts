export interface State {
  signInForm: {
    username?: string;
    password?: string;
    email?: string;
    phone?: string;
    gender?: string;
  };

  errors: Record<string, string>;
}
