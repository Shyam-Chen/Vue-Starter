export interface State {
  zodForm: {
    username?: string;
    password?: string;
    email?: string;
    phone?: string;
    gender?: string;
    plan?: string;
  };
  zodValdn: Record<string, string>;
  touchValdn: Record<string, string>;
}
