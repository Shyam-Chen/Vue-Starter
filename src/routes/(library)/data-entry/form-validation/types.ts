export interface State {
  zodForm: {
    username?: string;
    password?: string;
    email?: string;
    phone?: string;
    gender?: string;
  };
  zodValdn: Record<string, string>;
}
