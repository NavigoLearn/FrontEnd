export type IColorThemesFields = {
  primary: string;
  secondary: string;
  tertiary: string;
};

export type IColorThemes = {
  defaultTheme: IColorThemesFields;
  whiteTheme: IColorThemesFields;
  darkTheme: IColorThemesFields;
};

export type IColorThemesOptions = 'defaultTheme' | 'whiteTheme' | 'darkTheme';
export type IColorThemesColors = 'primary' | 'secondary' | 'tertiary';