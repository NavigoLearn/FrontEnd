import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import * as d3 from 'd3';
import {
  injectDraggingElementId,
  injectDraggingElementIdentifier,
  injectDraggingElementType,
  injectDraggingStrategy,
} from '@src/typescript/roadmap_ref/dragging/inject';
import { mutateNodeCoords } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers';
import { getComponentById } from '@src/typescript/roadmap_ref/node/core/data-get/components';
import { mutateComponentCoords } from '@src/typescript/roadmap_ref/node/components/mutate';
import { getScaleSafari } from '@store/roadmap-refactor/misc/scale-safari';
import { recalculateNodeChunks } from '@src/typescript/roadmap_ref/node/core/calculations/general';
import {
  addNodeToChunks,
  getNodeByIdRoadmapSelector,
  removeNodeFromChunks,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { afterEventLoop } from '@src/typescript/utils/misc';

export function draggingBehaviorFactoryRoadmapNode(
  nodeId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementIdentifier(draggingBehavior, 'div');
  injectDraggingElementId(draggingBehavior, nodeId);
  injectDraggingStrategy(draggingBehavior, 'free');
  injectDraggingElementType(draggingBehavior, 'node');

  draggingBehavior.getCurrentCoords = () => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    return {
      x: node.data.coords.x,
      y: node.data.coords.y,
    };
  };
  draggingBehavior.coordinatesAdapter = (x: number, y: number) => {
    return {
      x,
      y,
    };
  };

  draggingBehavior.coordinatesSetter = (x: number, y: number) => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    mutateNodeCoords(node, x, y);
    // resets the div transforms because mutating coords already rerenders and updates the location
    const sel = document.getElementById(`div${node.id}`);
    const obj = d3.select(sel);
    obj.style('transform', `translate(${0}px, ${0}px)`);
    removeNodeFromChunks(node);
    recalculateNodeChunks(node);
    addNodeToChunks(node);
    triggerNodeRerender(node.id);
  };

  draggingBehavior.draggingStrategy = (newX, newY) => {
    return {
      x: newX,
      y: newY,
    };
  };
  return draggingBehavior;
}

export function draggingBehaviorFactorySubNode(
  nodeId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementIdentifier(draggingBehavior, 'div');
  injectDraggingElementId(draggingBehavior, nodeId);
  injectDraggingStrategy(draggingBehavior, 'snap');
  injectDraggingElementType(draggingBehavior, 'subNode');

  draggingBehavior.getCurrentCoords = () => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    return {
      x: node.data.coords.x,
      y: node.data.coords.y,
    };
  };
  draggingBehavior.coordinatesAdapter = (x: number, y: number) => {
    // adapting x and y to the scale of the editor
    // since the positions are modified similar to a vector, we only need to normalize that vector to get the correct position
    const scale = getScaleSafari();
    const newX = x / scale;
    const newY = y / scale;

    return {
      x: newX,
      y: newY,
    };
  };

  draggingBehavior.coordinatesSetter = (x: number, y: number) => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    mutateNodeCoords(node, x, y);
    // resets the div transforms because mutating coords already rerenders and updates the location
    const sel = document.getElementById(`div${node.id}`);
    const obj = d3.select(sel);
    triggerNodeRerender(node.id);
    afterEventLoop(() => {
      obj.style('transform', `translate(${0}px, ${0}px)`);
    });
  };

  draggingBehavior.draggingStrategy = (newX, newY) => {
    return {
      x: newX,
      y: newY,
    };
  };
  return draggingBehavior;
}

export function draggingBehaviorFactoryComponents(
  nodeId: string,
  componentId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementIdentifier(draggingBehavior, 'div');
  injectDraggingElementId(draggingBehavior, componentId);
  injectDraggingStrategy(draggingBehavior, 'snap');
  injectDraggingElementType(draggingBehavior, 'component');

  draggingBehavior.getCurrentCoords = () => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    const component = getComponentById(node, componentId);
    return {
      x: component.x,
      y: component.y,
    };
  };
  draggingBehavior.coordinatesAdapter = (x: number, y: number) => {
    const scale = getScaleSafari();
    const newX = x / scale;
    const newY = y / scale;

    return {
      x: newX,
      y: newY,
    };
  };

  draggingBehavior.coordinatesSetter = (x: number, y: number) => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    const component = getComponentById(node, componentId);
    mutateComponentCoords(component, x, y);
    // resets the div transforms because mutating coords already rerenders and updates the location
    const sel = document.getElementById(`div${component.id}`);
    const obj = d3.select(sel);
    obj.style('transform', `translate(${0}px, ${0}px)`);
    triggerNodeRerender(node.id);
  };

  draggingBehavior.draggingStrategy = (newX, newY) => {
    return {
      x: newX,
      y: newY,
    };
  };
  return draggingBehavior;
}
