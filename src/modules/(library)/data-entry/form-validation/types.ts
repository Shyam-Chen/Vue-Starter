type Form = {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  gender?: string;
};

type Valdn = Record<string, string>;

export interface State {
  yupForm: Form;
  yupValdn: Valdn;

  zodForm: Form;
  zodValdn: Valdn;
}
