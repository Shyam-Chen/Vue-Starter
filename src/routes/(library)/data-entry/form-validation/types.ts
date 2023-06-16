type Form = {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  gender?: string;
};

type Valdn = Record<string, string>;

export interface State {
  zodForm: Form;
  zodValdn: Valdn;
}
