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
  navigation: Navigation[];
  drawer: boolean | null;
  languages: Array<{ key: string, label: string }>;
}
