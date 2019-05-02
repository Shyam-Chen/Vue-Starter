// @flow

export interface Navigation {
  icon?: string;
  text?: string;
  route?: string;
  href?: string;
  disabled?: boolean;
  subheader?: string;
  divider?: boolean;
  children?: Navigation[];
}

export interface IApp {
  theme: string;
  navigation: Navigation[];
  drawer: boolean | null;
  languages: Array<{ key: string, country: string, label: string }>;
}
