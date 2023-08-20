import {
  IColorThemesColors,
  IColorThemesOptions,
} from '@type/roadmap/node/colors-types';
import { colorThemes } from '@src/typescript/roadmap_ref/node/core/color-themes';

export function selectNodeColorScheme(
  colorTheme: IColorThemesOptions,
  colorType: IColorThemesColors
) {
  return colorThemes[colorTheme][colorType].nodeColor;
}

export function selectNodeColorText(
  colorTheme: IColorThemesOptions,
  colorType: IColorThemesColors
) {
  return colorThemes[colorTheme][colorType].textColor;
}
