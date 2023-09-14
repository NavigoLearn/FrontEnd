import { appendNodeToChunks } from '@src/typescript/roadmap_ref/roadmap-data/services/append';
import { getChildrenRenderedTraceback } from '@src/typescript/roadmap_ref/roadmap-data/protocols/get';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { deleteNodeFromChunks } from '@src/typescript/roadmap_ref/roadmap-data/services/delete';
import { mutateNodeCoords } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { recalculateNodeChunks } from '@src/typescript/roadmap_ref/node/core/calculations/general';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import * as d3 from 'd3';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { getComponentById } from '@src/typescript/roadmap_ref/node/core/data-get/components';
import { mutateComponentCoords } from '@src/typescript/roadmap_ref/node/components/mutate';
import { getElementG } from '@store/roadmap-refactor/elements-editing/elements-gs';
import { getTransformXY } from '@src/typescript/roadmap_ref/render/coord-calc';

export const draggingEndNode = (
  draggingBehavior: DraggingBehavior,
  x: number,
  y: number
) => {
  const nodeId = draggingBehavior.draggingElementId;
  const node = getNodeByIdRoadmapSelector(nodeId);
  mutateNodeCoords(node, x, y);
  // resets the element transforms because mutating coords already rerenders and updates the location
  const elementType = draggingBehavior.draggingElementIdentifier;
  const sel = document.getElementById(`${elementType}${node.id}`);
  const obj = d3.select(sel);
  obj.style('transform', `translate(${0}px, ${0}px)`);
  deleteNodeFromChunks(node);
  recalculateNodeChunks(node);
  appendNodeToChunks(node);
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

  const elementType = draggingBehavior.draggingElementIdentifier;
  const sel = document.getElementById(`${elementType}${node.id}`);
  const obj = d3.select(sel);
  triggerNodeRerender(node.id);
  afterEventLoop(() => {
    obj.style('transform', `translate(${0}px, ${0}px)`);
  });
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

  const elementType = draggingBehavior.draggingElementIdentifier;
  const sel = document.getElementById(`${elementType}${component.id}`);
  const obj = d3.select(sel);
  obj.style('transform', `translate(${0}px, ${0}px)`);
  triggerNodeRerender(node.id);
};

export const draggingEndNodeTransformBased = (
  draggingBehavior: DraggingBehavior
) => {
  const nodeId = draggingBehavior.draggingElementId;
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { transform } = getElementG(nodeId).style;
  const { x: offsetX, y: offsetY } = getTransformXY(transform);
  mutateNodeCoords(
    node,
    node.data.coords.x + offsetX,
    node.data.coords.y + offsetY
  );
  const elementType = draggingBehavior.draggingElementIdentifier;
  const sel = document.getElementById(`${elementType}${node.id}`);
  const obj = d3.select(sel);
  obj.style('transform', `translate(${0}px, ${0}px)`);
  deleteNodeFromChunks(node);
  recalculateNodeChunks(node);
  appendNodeToChunks(node);
  triggerNodeRerender(node.id);
};

type DraggingEnd = (x: number, y: number) => void;

export const getDraggingEndFactory = (
  draggingBehavior: DraggingBehavior
): DraggingEnd => {
  if (draggingBehavior.draggingElementType === 'node') {
    return (x: number, y: number) => draggingEndNode(draggingBehavior, x, y);
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
    const childNode = getNodeByIdRoadmapSelector(childId);
    draggingEndNodeTransformBased(childNode.draggingBehavior);
  });
};
