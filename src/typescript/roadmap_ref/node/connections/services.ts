import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  ConnectionClass,
  type IConnectionPositions,
} from '@src/typescript/roadmap_ref/node/connections/core';
import { type HashMapWithKeys } from '@type/roadmap/misc';
import { getTransformXY } from '@src/typescript/roadmap_ref/render/coord-calc';
import { getRenderingEngineDraggingElementIdentifier } from '@components/roadmap/rendering-engines/store-rendering-engine';

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

export function connectionSetter(
  position: 'to' | 'from',
  connection: ConnectionClass,
  positionType: IConnectionPositions
) {
  if (position === 'from') {
    connection.positionFrom = positionType;
  } else if (position === 'to') {
    connection.positionTo = positionType;
  }
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
  const elementIdentifier = getRenderingEngineDraggingElementIdentifier();
  const element = document.getElementById(`${elementIdentifier}${node.id}`);
  if (!element) return coords;
  const { transform } = element.style;
  if (!transform) return coords;
  const { x: offsetX, y: offsetY } = getTransformXY(transform);
  coords.x += offsetX;
  coords.y += offsetY;
  return coords;
}

export function getAnchorPositionRelativeToNode(
  node: NodeClass,
  positionType: IConnectionPositions
): ICoord {
  const coordsMapper = {
    'top-left': {
      x: 0,
      y: 0,
    },
    'top-right': {
      x: node.data.width,
      y: 0,
    },
    'bottom-left': {
      x: 0,
      y: node.data.height,
    },
    'bottom-right': {
      x: node.data.width,
      y: node.data.height,
    },
    center: {
      x: node.data.width / 2,
      y: node.data.height / 2,
    },
    left: {
      x: 0,
      y: node.data.height / 2,
    },
    right: {
      x: node.data.width,
      y: node.data.height / 2,
    },
    top: {
      x: node.data.width / 2,
      y: 0,
    },
    bottom: {
      x: node.data.width / 2,
      y: node.data.height,
    },
  };
  const coords = coordsMapper[positionType];
  return coords;
}
