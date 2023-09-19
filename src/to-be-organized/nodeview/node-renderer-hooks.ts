import { useStore } from '@nanostores/react';
import {
  storeConnectionSelected,
  storeConnectionSelectedParent,
  storeConnectionSelectedChild,
} from '@components/roadmap/connections/connection-editing/connection-store';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { ICoords } from '@src/typescript/roadmap_ref/dragging/core';

export function useNodeData(node: NodeClass) {
  const isSubNode = node.flags.subNodeFlag;
  const isRootNode = node.flags.renderedOnRoadmapFlag;
  if (isRootNode === isSubNode)
    throw new Error('Node is either root or subnode, but not both');

  const {
    width: widthData,
    height: heightData,
    opacity: opacityData,
    colorType: colorTypeData,
    backgroundOpacity: backgroundOpacityData,
  } = node.data;

  // ensure node has all data it needs
  const width = widthData ?? 200;
  const height = heightData ?? 50;
  const opacity = opacityData ?? 100;
  const colorType = colorTypeData ?? 'primary';
  const backgroundOpacity = backgroundOpacityData ?? 100;
  const bgOpacity = backgroundOpacity / 100;

  const { subNodeIds } = node;

  return {
    isSubNode,
    isRootNode,
    width,
    height,
    opacity,
    colorType,
    bgOpacity,
    subNodeIds,
  };
}

export function useSelectedConnectionData() {
  const connectionSelectedChildId = useStore(storeConnectionSelectedChild);
  const connectionSelectedParentId = useStore(storeConnectionSelectedParent);
  const currentConnection = useStore(storeConnectionSelected);
  return {
    connectionSelectedChildId,
    connectionSelectedParentId,
    currentConnection,
  };
}

function handleSubNodeCoords(
  node: NodeClass,
  centeringOffset: ICoords
): ICoords {
  const rawNodeCoords = {
    x: node.data.coords.x,
    y: node.data.coords.y,
  };

  const centeredNodeCoords = {
    x: rawNodeCoords.x + centeringOffset.x,
    y: rawNodeCoords.y + centeringOffset.y,
  };

  return centeredNodeCoords;
}

function handleRootNodeCoords(node, centerOffset): ICoords {
  // centering offset will always be 0,0 since the foreignObject size is equal to the node size
  // we dont add the coords of the node to the centering offset since the group in the Wrapper
  // for the node is already translated to its position

  return centerOffset;
}

export function useCalculateNodeCoords(node: NodeClass, centerOffset: ICoords) {
  // the offset for the nodes-page rendered directly on the roadmap is calculated directly
  // on its group and foreign object in NodeManager. This is why you need to treat the coords
  // from subNodes which don't have their own foreign object and are divs relative to the parent node

  const isSubNode = node.flags.subNodeFlag;
  const { width, height } = node.data;

  const centeringOffset = {
    x: centerOffset.x - width / 2,
    y: centerOffset.y - height / 2,
  };

  const centeredCoords = isSubNode
    ? handleSubNodeCoords(node, centeringOffset)
    : handleRootNodeCoords(node, centeringOffset);

  return centeredCoords;
}
