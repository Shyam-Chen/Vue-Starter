// @flow

export interface Navigation {
  icon?: string;
  text?: string;
  route?: string;
  disabled?: boolean;
  subheader?: string;
  children?: Navigation[];
}

export interface IApp {
  theme: string;
  navigation: Navigation[];
  drawer: boolean | null;
  languages: Array<{ key: string, label: string }>;
}
