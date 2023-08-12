import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IConnectionPositions } from '@src/typescript/roadmap_ref/node/connections/core';
import { HashMapWithKeys } from '@type/roadmap/stores/roadmap';
import { getTransformXY } from '@src/typescript/roadmap_ref/render/coord-calc';

type ICoord = {
  x: number;
  y: number;
};

export function getTopLeftCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x,
    y: node.data.coords.y,
  };
  // add padding
  coords.x += 5;
  coords.y += 5;
  return coords;
}

export function getTopRightCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x + node.data.width,
    y: node.data.coords.y,
  };
  // add padding
  coords.x -= 5;
  coords.y += 5;
  return coords;
}

export function getBottomLeftCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x,
    y: node.data.coords.y + node.data.height,
  };
  // add padding
  coords.x += 5;
  coords.y -= 5;
  return coords;
}

export function getBottomRightCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x + node.data.width,
    y: node.data.coords.y + node.data.height,
  };
  // add padding
  coords.x -= 5;
  coords.y -= 5;
  return coords;
}

export function getCenterCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x + node.data.width / 2,
    y: node.data.coords.y + node.data.height / 2,
  };
  return coords;
}

export function getLeftCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x,
    y: node.data.coords.y + node.data.height / 2,
  };
  return coords;
}

export function getRightCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x + node.data.width,
    y: node.data.coords.y + node.data.height / 2,
  };
  return coords;
}

export function getTopCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x + node.data.width / 2,
    y: node.data.coords.y,
  };
  return coords;
}

export function getBottomCoords(node: NodeClass): ICoord {
  const coords = {
    x: node.data.coords.x + node.data.width / 2,
    y: node.data.coords.y + node.data.height,
  };
  return coords;
}

type IFunctionCoord = (node: NodeClass) => ICoord;

export function getConnectionPositionCoords(
  node: NodeClass,
  positionType: IConnectionPositions
): ICoord {
  const coordsMapper: HashMapWithKeys<IConnectionPositions, IFunctionCoord> = {
    'top-left': getTopLeftCoords,
    'top-right': getTopRightCoords,
    'bottom-left': getBottomLeftCoords,
    'bottom-right': getBottomRightCoords,
    center: getCenterCoords,
    left: getLeftCoords,
    right: getRightCoords,
    top: getTopCoords,
    bottom: getBottomCoords,
  };
  const coords = coordsMapper[positionType](node);
  // gets the transform offset if the node is currently being dragged
  const element = document.getElementById(`div${node.id}`);
  if (!element) return coords;
  const { transform } = element.style;
  if (!transform) return coords;
  const { x: offsetX, y: offsetY } = getTransformXY(transform);
  coords.x += offsetX;
  coords.y += offsetY;
  return coords;
}
