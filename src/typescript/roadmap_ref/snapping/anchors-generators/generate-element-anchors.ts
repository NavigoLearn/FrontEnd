import { ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import {
  getNodeByIdRoadmapSelector,
  getNodeCenterAbsoluteCoords,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export function getNodeAnchorsPositions(nodeId: string): ICoords[] {
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
  // center position
  corners.push({
    x: center.x,
    y: center.y,
  });

  return corners;
}

export function getNodeMovedAnchorsPositions(
  nodeId: string,
  dragX: number,
  dragY: number
): ICoords[] {
  let corners: ICoords[] = [];
  const node = getNodeByIdRoadmapSelector(nodeId);
  const center = getNodeCenterAbsoluteCoords(nodeId);

  const offset = {
    x: dragX - node.data.coords.x,
    y: dragY - node.data.coords.y,
  };

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
  // center position
  corners.push({
    x: center.x,
    y: center.y,
  });

  corners = corners.map((corner) => {
    return {
      x: corner.x + offset.x,
      y: corner.y + offset.y,
    };
  });

  return corners;
}
