import {
  IColorThemesColors,
  IColorThemesOptions,
} from '@type/roadmap/node/colors-types';

import { selectNodeColorScheme } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import {
  defaultColorThemeOption,
  defaultNodeHeight,
  defaultNodeOpacity,
  defaultNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/factories/params/default-params';
import { IFontSizeType } from '@type/roadmap/node/components-types';

export class Data {
  /* Used to manage all the possible data of a node */

  private colorTypePrivate: IColorThemesColors;

  colorTheme: IColorThemesOptions;

  color: string;

  width: number;

  height: number;

  opacity: number;

  fontSizeType: IFontSizeType;

  center: {
    x: number;
    y: number;
  };

  coords: {
    x: number;
    y: number;
  };

  set colorType(colorType: IColorThemesColors) {
    this.color = selectNodeColorScheme(this.colorTheme, colorType);
    this.colorTypePrivate = colorType;
  }

  get colorType(): IColorThemesColors {
    return this.colorTypePrivate;
  }

  constructor() {
    this.colorTheme = defaultColorThemeOption;
    this.colorType = 'primary';
    this.width = defaultNodeWidth;
    this.height = defaultNodeHeight;
    this.opacity = defaultNodeOpacity;
    this.center = {
      x: 0,
      y: 0,
    };
    this.coords = {
      x: 0,
      y: 0,
    };
  }
}
