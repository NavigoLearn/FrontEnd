import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import {
  getNodeByIdRoadmapSelector,
  getNodeCenterAbsoluteCoords,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { type IComponentObject } from '@type/roadmap/node/components-types';

export function getSubNodeAnchorsPositions(nodeId: string): ICoords[] {
  const corners: ICoords[] = [];
  const node = getNodeByIdRoadmapSelector(nodeId);
  const center = {
    // because the node data is the center already
    x: node.data.coords.x,
    y: node.data.coords.y,
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

  return corners;
}

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

export function getSubNodeMovedAnchorsPositions(
  nodeId: string,
  dragX: number,
  dragY: number
): ICoords[] {
  let corners: ICoords[] = [];
  const node = getNodeByIdRoadmapSelector(nodeId);

  const center = {
    x: node.data.coords.x,
    y: node.data.coords.y,
  };

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

export function getComponentAnchorsPositions(
  component: IComponentObject
): ICoords[] {
  const corners: ICoords[] = [];
  const { width, height } = component;
  const center = {
    x: component.x,
    y: component.y,
  };

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

export function getComponentMovedAnchorsPositions(
  component: IComponentObject,
  dragX: number,
  dragY: number
): ICoords[] {
  let corners: ICoords[] = [];

  const center = {
    x: component.x,
    y: component.y,
  };

  const offset = {
    x: dragX - component.x,
    y: dragY - component.y,
  };

  const { width, height } = component;

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
