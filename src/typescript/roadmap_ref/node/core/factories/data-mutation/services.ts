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
import { mutateNodeOpacity } from '../../data-mutation/mutate';
import { mutateComponentTextOpacity } from '../../../components/text/mutate';

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

export function selectNodeDefaultOpacity(
  colorTheme: IColorThemesOptions,
  colorType: IColorThemesColors
) {
  return colorThemes[colorTheme][colorType].defaultOpacity;
}

export function selectNodeColorTextBorder(
  colorTheme: IColorThemesOptions,
  colorType: IColorThemesColors
) {
  return colorThemes[colorTheme][colorType].borderColor;
}

export function selectNodeDefaultOpacityText(
  colorTheme: IColorThemesOptions,
  colorType: IColorThemesColors
) {
  return colorThemes[colorTheme][colorType].opacity;
}

export function selectTextFontWeight(mode: keyof ITextWidthModes) {
  return textWidthModes[mode].fontWeight;
}

export function selectTextFontSize(mode: keyof ITextSizeModes) {
  return textSizeModes[mode].fontSize;
}

export function transformOpacity(opacity: number) {
  return opacity / 100;
}
