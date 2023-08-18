import React from 'react';
import {
  IColorThemesColors,
  IColorThemesOptions,
} from '@type/roadmap/node/colors-types';

type IVariant = {
  callback: () => void;
  color: string;
};
type IVariantsComponentProps = {
  selectedColor: IColorThemesColors;
  selectedTheme: IColorThemesOptions;
};

const VariantsComponent = ({
  selectedColor,
  selectedTheme,
}: IVariantsComponentProps) => {
  // getting the selected color
  // getting the selected theme
  // displaying the colors from the theme and highlights the currently selected color
  return <div className='' />;
};

export default VariantsComponent;
