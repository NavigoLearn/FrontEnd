import { IColorSchemaFields } from '@type/roadmap/node/colors-types';

import { selectNodeColorScheme } from '@typescript/roadmap_ref/node/core/factories/injectors/services';
import {
  defaultColorSchemaOption,
  defaultNodeHeight,
  defaultNodeOpacity,
  defaultNodeWidth,
} from '@typescript/roadmap_ref/node/core/factories/params/default-params';

export class Properties {
  /* Used to manage all the possible properties of a node */
  color: IColorSchemaFields;

  width: number;

  height: number;

  opacity: number;

  constructor() {
    this.color = selectNodeColorScheme(defaultColorSchemaOption);
    this.width = defaultNodeWidth;
    this.height = defaultNodeHeight;
    this.opacity = defaultNodeOpacity;
  }
}

export const a = 1;
