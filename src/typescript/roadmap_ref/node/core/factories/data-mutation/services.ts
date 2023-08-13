import {
  IColorThemesColors,
  IColorThemesOptions,
} from '@type/roadmap/node/colors-types';
import { colorThemes } from '@src/typescript/roadmap_ref/node/core/factories/params/params';

export function selectNodeColorScheme(
  colorTheme: IColorThemesOptions,
  colorType: IColorThemesColors
) {
  return colorThemes[colorTheme][colorType];
}
