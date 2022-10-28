export interface State {
  signInForm: {
    username?: string;
    password?: string;
  };

  signedIn: boolean;

  errors: Record<string, string>;
}
