import { type IColorThemesColors } from '@type/roadmap/node/colors-types';

import {
  DEFAULT_COLOR_THEME_OPTION,
  DEFAULT_NODE_BACKGROUND_OPACITY,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_NODE_OPACITY,
  DEFAULT_NODE_WIDTH,
} from '@src/typescript/roadmap_ref/node/core/factories/params/default-params';

export class Data {
  /* Used to manage all the possible data of a node */

  colorType: IColorThemesColors;

  width: number;

  height: number;

  opacity: number;

  backgroundOpacity: number;

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
    this.width = DEFAULT_NODE_WIDTH;
    this.height = DEFAULT_NODE_HEIGHT;
    this.opacity = DEFAULT_NODE_OPACITY;
    this.backgroundOpacity = DEFAULT_NODE_BACKGROUND_OPACITY;
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
