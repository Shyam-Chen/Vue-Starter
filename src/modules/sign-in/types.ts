export interface State {
  signInForm: {
    account?: string;
    password?: string;
  };

  signedIn: boolean;

  errors: Record<string, string>;
}
