export type IColorTheme = {
  nodeColor: string;
  textColor: string;
};

export type IColorThemesFields = {
  primary: IColorTheme;
  secondary: IColorTheme;
  tertiary: IColorTheme;
};

export type IColorThemes = {
  defaultTheme: IColorThemesFields;
  whiteTheme: IColorThemesFields;
  darkTheme: IColorThemesFields;
};

export type IColorThemesOptions = 'defaultTheme' | 'whiteTheme' | 'darkTheme';
export type IColorThemesColors = 'primary' | 'secondary' | 'tertiary';
