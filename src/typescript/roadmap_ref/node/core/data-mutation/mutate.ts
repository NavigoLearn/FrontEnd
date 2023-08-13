import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IColorThemesColors } from '@type/roadmap/node/colors-types';
import { triggerCenterRecalculationDecorator } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate-decorators';
import { triggerHubListeners } from '@store/roadmap-refactor/subscribers/function-subscribers';
import { IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions';
import { selectNodeColorScheme } from '@src/typescript/roadmap_ref/node/core/factories/injectors/services';

export function mutateNodeOpacity(node: NodeClass, opacity: number) {
  node.data.opacity = opacity;
}
export function mutateNodeColor(
  node: NodeClass,
  colorType: IColorThemesColors
) {
  node.data.colorType = colorType;
}

export const mutateNodeWidth = triggerHubListeners(
  'mutateNodeWidth',
  triggerCenterRecalculationDecorator((node: NodeClass, width: number) => {
    node.data.width = width;
  })
);

export const mutateNodeHeight = triggerHubListeners(
  'mutateNodeHeight',
  triggerCenterRecalculationDecorator((node: NodeClass, height: number) => {
    node.data.height = height;
  })
);

export const mutateNodeCoordX = triggerHubListeners(
  'mutateNodeCoordX',
  (node: NodeClass, x: number) => {
    node.data.coords.x = x;
  }
);

export const mutateNodeCoordY = triggerHubListeners(
  'mutateNodeCoordY',
  (node: NodeClass, y: number) => {
    node.data.coords.y = y;
  }
);

export function mutateNodeCoords(node: NodeClass, x: number, y: number) {
  mutateNodeCoordX(node, x);
  mutateNodeCoordY(node, y);
}

export function mutateNodeName(node: NodeClass, name: string) {
  node.name = name;
}

export function mutateNodeOnClickAction(node: NodeClass, action: IActionTypes) {
  node.actions.onClick = action;
}
