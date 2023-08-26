import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IColorThemesColors } from '@type/roadmap/node/colors-types';
import { triggerCenterRecalculationDecorator } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate-decorators';
import { triggerHubListeners } from '@store/roadmap-refactor/subscribers/function-subscribers';
import { IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions/core';
import {
  selectNodeColorFromScheme,
  selectNodeColorText,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  getIsRootNode,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export function mutateNodeOpacity(node: NodeClass, opacity: number) {
  node.data.opacity = opacity;
}
export function mutateNodeColor(
  node: NodeClass,
  colorType: IColorThemesColors
) {
  node.data.colorType = colorType;
  // node.data.color = selectNodeColorScheme(node.data.colorTheme, colorType);
  // node.data.textColor = selectNodeColorText(node.data.colorTheme, colorType);
  triggerNodeRerender(node.id);
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

export const mutateNodeHeightWhileKeepingCenter = (
  node: NodeClass,
  newHeight: number
) => {
  const { data } = node;
  const oldHeight = node.data.height;
  getIsRootNode(node.id) &&
    mutateNodeCoordY(node, data.coords.y + (oldHeight - newHeight) / 2);
  mutateNodeHeight(node, newHeight);
};

export const mutateNodeWidthWhileKeepingCenter = (
  node: NodeClass,
  newWidth: number
) => {
  const { data } = node;
  const oldWidth = node.data.width;
  getIsRootNode(node.id) &&
    mutateNodeCoordX(node, data.coords.x + (oldWidth - newWidth) / 2);
  mutateNodeWidth(node, newWidth);
};

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
