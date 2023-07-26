import { IColorSchemaOptions } from '@type/roadmap/node/colors-types';
import { colorSchemas } from '@src/typescript/roadmap_ref/node/core/factories/params/params';

export function selectNodeColorScheme(
  selector: IColorSchemaOptions = 'default'
) {
  const option: IColorSchemaOptions = selector;
  return colorSchemas[option];
}
