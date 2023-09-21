import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import {
  getNodeCenterAbsoluteCoords,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export function getNodeCornerPositions(nodeId: string): ICoords[] {
  const corners: ICoords[] = [];
  const node = getNodeByIdRoadmapSelector(nodeId);
  const center = getNodeCenterAbsoluteCoords(nodeId);

  const { width, height } = node.data;
  // top left
  corners.push({
    x: center.x - width / 2,
    y: center.y - height / 2,
  });
  // top right
  corners.push({
    x: center.x + width / 2,
    y: center.y - height / 2,
  });
  // bottom left
  corners.push({
    x: center.x - width / 2,
    y: center.y + height / 2,
  });
  // bottom right
  corners.push({
    x: center.x + width / 2,
    y: center.y + height / 2,
  });

  return corners;
}

export function getNodeCornerPositionsWithWH(
  nodeId: string,
  width: number,
  height: number
): ICoords[] {
  const corners: ICoords[] = [];
  const node = getNodeByIdRoadmapSelector(nodeId);
  const center = getNodeCenterAbsoluteCoords(nodeId);

  corners.push({
    x: center.x - width / 2,
    y: center.y - height / 2,
  });
  corners.push({
    x: center.x + width / 2,
    y: center.y - height / 2,
  });
  corners.push({
    x: center.x - width / 2,
    y: center.y + height / 2,
  });
  corners.push({
    x: center.x + width / 2,
    y: center.y + height / 2,
  });

  return corners;
}
