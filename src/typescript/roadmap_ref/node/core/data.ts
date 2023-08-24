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
import { deepCopy } from '../../utils';
import { selectNodeColorText } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@src/components/roadmap/displayers/setup-screen/theme-controler';
import { get } from 'http';

export class Data {
  /* Used to manage all the possible data of a node */

  private colorTypePrivate: IColorThemesColors;

  colorTheme: IColorThemesOptions;

  textColor: string;

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

  // setter does not work
  set colorType(colorType: IColorThemesColors) {
    this.color = selectNodeColorScheme(this.colorTheme, colorType);
    this.colorTypePrivate = colorType;
  }

  get colorType(): IColorThemesColors {
    return this.colorTypePrivate;
  }

  constructor() {
    this.colorTheme = getColorThemeFromRoadmap();
    this.colorType = 'primary';
    this.textColor = selectNodeColorText(this.colorTheme, this.colorType);
    this.color = selectNodeColorScheme(this.colorTheme, this.colorType);
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
