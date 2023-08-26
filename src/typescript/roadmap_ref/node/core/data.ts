import {
  IColorThemesColors,
  IColorThemesOptions,
} from '@type/roadmap/node/colors-types';

import {
  selectNodeColorFromScheme,
  selectNodeColorText,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import {
  defaultColorThemeOption,
  defaultNodeHeight,
  defaultNodeOpacity,
  defaultNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/factories/params/default-params';
import {
  ITextSizeModes,
  ITextWidthModes,
} from '@type/roadmap/node/components-types';
import { get } from 'http';
import { deepCopy } from '../../utils';

export class Data {
  /* Used to manage all the possible data of a node */

  colorType: IColorThemesColors;

  width: number;

  height: number;

  opacity: number;

  textSize: keyof ITextSizeModes;

  textWeight: keyof ITextWidthModes;

  center: {
    x: number;
    y: number;
  };

  coords: {
    x: number;
    y: number;
  };

  // setter does not work

  constructor() {
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
