import {
  getNodeCenterAbsoluteCoords,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { type IMouseDirectionBase } from '@src/to-be-organized/resize-dragging/stores-resize-node';

export type ICoordsCustom = ICoords & {
  snapOnX: boolean;
  snapOnY: boolean;
  type: IMouseDirectionBase;
};

export const typeAssertICoordsCustom = (
  coords: any
): coords is ICoordsCustom => {
  return (
    typeof coords.snapOnX === 'boolean' && typeof coords.snapOnY === 'boolean'
  );
};

export function getResizedNodeAnchorsPositions(
  nodeId: string,
  anchorsDirections: IMouseDirectionBase[]
): ICoordsCustom[] {
  const anchorsCoords: ICoordsCustom[] = [];
  const node = getNodeByIdRoadmapSelector(nodeId);
  const center = getNodeCenterAbsoluteCoords(nodeId);

  const { width, height } = node.data;

  if (anchorsDirections.includes('top')) {
    anchorsCoords.push({
      x: center.x,
      y: center.y - height / 2,
      snapOnX: false,
      snapOnY: true,
      type: 'top',
    });
  }
  if (anchorsDirections.includes('bottom')) {
    anchorsCoords.push({
      x: center.x,
      y: center.y + height / 2,
      snapOnX: false,
      snapOnY: true,
      type: 'bottom',
    });
  }
  if (anchorsDirections.includes('left')) {
    anchorsCoords.push({
      x: center.x - width / 2,
      y: center.y,
      snapOnX: true,
      snapOnY: false,
      type: 'left',
    });
  }

  if (anchorsDirections.includes('right')) {
    anchorsCoords.push({
      x: center.x + width / 2,
      y: center.y,
      snapOnX: true,
      snapOnY: false,
      type: 'right',
    });
  }
  return anchorsCoords;
}

export function getResizedSubNodeAnchorsPositions(
  nodeId: string,
  anchorsDirections: IMouseDirectionBase[]
): ICoordsCustom[] {
  const anchorsCoords: ICoordsCustom[] = [];
  const node = getNodeByIdRoadmapSelector(nodeId);

  const center = {
    x: node.data.coords.x,
    y: node.data.coords.y,
  };

  const { width, height } = node.data;

  if (anchorsDirections.includes('top')) {
    anchorsCoords.push({
      x: center.x,
      y: center.y - height / 2,
      snapOnX: false,
      snapOnY: true,
      type: 'top',
    });
  }
  if (anchorsDirections.includes('bottom')) {
    anchorsCoords.push({
      x: center.x,
      y: center.y + height / 2,
      snapOnX: false,
      snapOnY: true,
      type: 'bottom',
    });
  }
  if (anchorsDirections.includes('left')) {
    anchorsCoords.push({
      x: center.x - width / 2,
      y: center.y,
      snapOnX: true,
      snapOnY: false,
      type: 'left',
    });
  }

  if (anchorsDirections.includes('right')) {
    anchorsCoords.push({
      x: center.x + width / 2,
      y: center.y,
      snapOnX: true,
      snapOnY: false,
      type: 'right',
    });
  }
  return anchorsCoords;
}
