export type IColorTheme = {
  nodeColor: string;
  textColor: string;
  borderColor: string;
  defaultOpacity: number;
};

export type IColorThemesFields = {
  primary: IColorTheme;
  secondary: IColorTheme;
  tertiary: IColorTheme;
  Quaternary: IColorTheme;
};

export type IColorThemes = {
  winterTheme: IColorThemesFields;
  autumnTheme: IColorThemesFields;
  summerTheme: IColorThemesFields;
  springTheme: IColorThemesFields;
};

export type IColorThemesOptions =
  | 'winterTheme'
  | 'autumnTheme'
  | 'summerTheme'
  | 'springTheme';
export type IColorThemesColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary';
