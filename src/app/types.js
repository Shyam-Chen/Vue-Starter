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
  languages: Array<{ key: string, country: string, label: string }>;
}

export interface IContent {
  dispatch(action: string, payload: any): void;
  state: IApp;
}
