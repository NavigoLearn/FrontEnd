import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import * as d3 from 'd3';
import {
  injectDraggingElementId,
  injectDraggingElementIdentifier,
  injectDraggingStrategy,
} from '@src/typescript/roadmap_ref/dragging/inject';
import { mutateNodeCoords } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers';
import { getNodeByIdRoadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';

export function draggingBehaviorFactoryRoadmapNode(
  nodeId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementIdentifier(draggingBehavior, 'div');
  injectDraggingElementId(draggingBehavior, nodeId);
  injectDraggingStrategy(draggingBehavior, 'free');
  draggingBehavior.getCurrentCoords = () => {
    const node = getNodeByIdRoadmapEdit(nodeId);
    return {
      x: node.data.coords.x,
      y: node.data.coords.y,
    };
  };
  draggingBehavior.coordinatesAdapter = (x: number, y: number) => {
    // const transform = d3
    //   .select(
    //     `${draggingBehavior.draggingElementIdentifier}${draggingBehavior.draggingElementId}`
    //   )
    //   .attr('transform');
    // const { x: nodeX, y: nodeY } = getTransformXY(transform);

    return {
      x,
      y,
    };
  };

  draggingBehavior.coordinatesSetter = (x: number, y: number) => {
    const node = getNodeByIdRoadmapEdit(nodeId);
    mutateNodeCoords(node, x, y);
    // resets the div transforms because mutating coords already rerenders and updates the location
    const sel = document.getElementById(`div${node.id}`);
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

export function draggingBehaviorFactorySubNode(
  nodeId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementIdentifier(draggingBehavior, 'div');
  injectDraggingElementId(draggingBehavior, nodeId);
  injectDraggingStrategy(draggingBehavior, 'snap');
  draggingBehavior.getCurrentCoords = () => {
    const node = getNodeByIdRoadmapEdit(nodeId);
    return {
      x: node.data.coords.x,
      y: node.data.coords.y,
    };
  };
  draggingBehavior.coordinatesAdapter = (x: number, y: number) => {
    // console.log('xy', x, y);
    // search recursively for the parent node

    return {
      x,
      y,
    };
  };

  draggingBehavior.coordinatesSetter = (x: number, y: number) => {
    const node = getNodeByIdRoadmapEdit(nodeId);
    mutateNodeCoords(node, x, y);
    // resets the div transforms because mutating coords already rerenders and updates the location
    const sel = document.getElementById(`div${node.id}`);
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

export function draggingBehaviorFactoryComponents(
  nodeId: string,
  componentId: string
): DraggingBehavior {
  // might need refactor to get the data from the store and not keep a reference directly
  const draggingBehavior = new DraggingBehavior();
  injectDraggingElementIdentifier(draggingBehavior, 'div');
  injectDraggingElementId(draggingBehavior, nodeId);
  injectDraggingStrategy(draggingBehavior, 'snap');
  draggingBehavior.getCurrentCoords = () => {
    const node = getNodeByIdRoadmapEdit(nodeId);
    return {
      x: node.data.coords.x,
      y: node.data.coords.y,
    };
  };
  draggingBehavior.coordinatesAdapter = (x: number, y: number) => {
    // console.log('xy', x, y);
    // search recursively for the parent node

    return {
      x,
      y,
    };
  };

  draggingBehavior.coordinatesSetter = (x: number, y: number) => {
    const node = getNodeByIdRoadmapEdit(nodeId);
    mutateNodeCoords(node, x, y);
    // resets the div transforms because mutating coords already rerenders and updates the location
    const sel = document.getElementById(`div${node.id}`);
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
