import {
  IColorThemesColors,
  IColorThemesOptions,
} from '@type/roadmap/node/colors-types';
import { colorThemes } from '@src/typescript/roadmap_ref/node/core/color-themes';
import {
  ITextWidthModes,
  ITextSizeModes,
} from '@src/types/roadmap/node/components-types';
import { textWidthModes, textSizeModes } from '../../font-parameters';

export function selectNodeColorFromScheme(
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

export function selectNodeColorTextBorder(
  colorTheme: IColorThemesOptions,
  colorType: IColorThemesColors
) {
  return colorThemes[colorTheme][colorType].borderColor;
}

export function selectTextFontWeight(mode: keyof ITextWidthModes) {
  return textWidthModes[mode].fontWeight;
}

export function selectTextFontSize(mode: keyof ITextSizeModes) {
  return textSizeModes[mode].fontSize;
}
