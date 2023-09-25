import { getChildrenRenderedTraceback } from '@src/typescript/roadmap_ref/roadmap-data/protocols/get';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { mutateNodeCoords } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  DraggingBehavior,
  type IDraggingElementIdentifiers,
} from '@src/typescript/roadmap_ref/dragging/core';
import * as d3 from 'd3';
import { getComponentById } from '@src/typescript/roadmap_ref/node/core/data-get/components';
import { mutateComponentCoords } from '@src/typescript/roadmap_ref/node/components/mutate';
import {
  getElementDiv,
  getElementG,
} from '@store/roadmap-refactor/elements-editing/elements-gs';
import { getTransformXY } from '@src/typescript/roadmap_ref/render/coord-calc';
import { getRenderingEngineDraggingElementIdentifier } from '@components/roadmap/rendering-engines/store-rendering-engine';
import { addNodeEvent } from '@src/to-be-organized/node-rendering-stuff/store-node-events';
import { recalculateNodeChunksWithRoadmapSideEffects } from '@src/typescript/roadmap_ref/node/core/data-mutation/protocol';

export const draggingEndRootNode = (
  draggingBehavior: DraggingBehavior,
  x: number,
  y: number
) => {
  const nodeId = draggingBehavior.draggingElementId;
  const node = getNodeByIdRoadmapSelector(nodeId);
  mutateNodeCoords(node, x, y);
  addNodeEvent(nodeId, 'reset-transform');
  recalculateNodeChunksWithRoadmapSideEffects(node);
  triggerNodeRerender(node.id);
};

export const draggingEndSubNode = (
  draggingBehavior: DraggingBehavior,
  x: number,
  y: number
) => {
  const nodeId = draggingBehavior.draggingElementId;
  const node = getNodeByIdRoadmapSelector(nodeId);
  mutateNodeCoords(node, x, y);
  addNodeEvent(nodeId, 'reset-transform');
  triggerNodeRerender(node.id);
  // the reset for transform in done in the node renderer
};

export const draggingEndComponent = (
  draggingBehavior: DraggingBehavior,
  x: number,
  y: number
) => {
  const nodeId = draggingBehavior.additionalData.parentNodeId;
  const componentId = draggingBehavior.draggingElementId;
  const node = getNodeByIdRoadmapSelector(nodeId);
  const component = getComponentById(node, componentId);
  mutateComponentCoords(component, x, y);

  const elementType = getRenderingEngineDraggingElementIdentifier();
  const sel = document.getElementById(`${elementType}${component.id}`);
  const obj = d3.select(sel);
  obj.style('transform', `translate(${0}px, ${0}px)`);
  triggerNodeRerender(node.id);
};

export const draggingEndNodeChild = (draggingBehavior: DraggingBehavior) => {
  const nodeId = draggingBehavior.draggingElementId;
  const node = getNodeByIdRoadmapSelector(nodeId);

  const elementIdentifier = getRenderingEngineDraggingElementIdentifier();

  const mapping: Record<IDraggingElementIdentifiers, () => string> = {
    div: () => {
      return document.getElementById(`div${nodeId}`).style.transform;
    },
    g: () => {
      return getElementG(nodeId).style.transform;
    },
  };

  const transform = mapping[elementIdentifier]();
  const { x: offsetX, y: offsetY } = getTransformXY(transform);
  console.log('offsetX', offsetX, 'offsetY', offsetY);

  mutateNodeCoords(
    node,
    node.data.coords.x + offsetX,
    node.data.coords.y + offsetY
  );
  addNodeEvent(nodeId, 'reset-transform');
  recalculateNodeChunksWithRoadmapSideEffects(node);
  triggerNodeRerender(node.id);
};

type DraggingEnd = (x: number, y: number) => void;

export const getDraggingEndFactory = (
  draggingBehavior: DraggingBehavior
): DraggingEnd => {
  if (draggingBehavior.draggingElementType === 'node') {
    return (x: number, y: number) =>
      draggingEndRootNode(draggingBehavior, x, y);
  }
  if (draggingBehavior.draggingElementType === 'subNode') {
    return (x: number, y: number) => draggingEndSubNode(draggingBehavior, x, y);
  }

  if (draggingBehavior.draggingElementType === 'component') {
    return (x: number, y: number) =>
      draggingEndComponent(draggingBehavior, x, y);
  }

  throw new Error('dragging behavior does not have proper element type');
};

export const draggingEndChildrenTraceback = (
  draggingBehavior: DraggingBehavior
) => {
  const nodeId = draggingBehavior.draggingElementId;
  const childrenNodes = getChildrenRenderedTraceback(nodeId);
  childrenNodes.forEach((childId) => {
    if (childId === nodeId) return;
    const childNode = getNodeByIdRoadmapSelector(childId);
    draggingEndNodeChild(childNode.draggingBehavior);
  });
};
