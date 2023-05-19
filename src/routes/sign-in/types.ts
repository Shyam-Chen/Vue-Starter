export interface State {
  signInForm: {
    username?: string;
    password?: string;
  };

  signedIn: boolean;
  otpEnabled: boolean;

  errors: Record<string, string>;
}
