import { IColorSchemaFields } from '@type/roadmap/node/colors-types';

import { selectNodeColorScheme } from '@src/typescript/roadmap_ref/node/core/factories/injectors/services';
import {
  defaultColorSchemaOption,
  defaultNodeHeight,
  defaultNodeOpacity,
  defaultNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/factories/params/default-params';

export class Data {
  /* Used to manage all the possible data of a node */
  color: IColorSchemaFields;

  width: number;

  height: number;

  opacity: number;

  center: {
    x: number;
    y: number;
  };

  coords: {
    x: number;
    y: number;
  };

  constructor() {
    this.color = selectNodeColorScheme(defaultColorSchemaOption);
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

export const a = 1;
