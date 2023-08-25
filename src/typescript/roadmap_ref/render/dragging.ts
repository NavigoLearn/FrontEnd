import * as d3 from 'd3';
import { Notifications } from '@src/UI-library/Notifications';
import {
  deleteDraggingRecursiveEffect,
  appendDraggingRecursiveEffect,
  elementEffects,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { deleteAllSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { setElementDraggableUpdateCallback } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { triggerConnectionRerender } from '@store/roadmap-refactor/render/rerender-trigger-connections';
import { getCurrentCoordsStrategyFactory } from '@src/typescript/roadmap_ref/dragging/strategies/get-current-coords';
import { getCoordinatesAdapterStrategyFactory } from '@src/typescript/roadmap_ref/dragging/strategies/coordinates-adapters';
import { getDraggingStrategyFactory } from '@src/typescript/roadmap_ref/dragging/strategies/dragging-strategies';
import {
  draggingEndChildrenTraceback,
  getDraggingEndFactory,
} from '@src/typescript/roadmap_ref/dragging/strategies/dragging-end';
import { getChildrenRenderedTraceback } from '@src/typescript/roadmap_ref/roadmap-data/protocols/get';
import renderedConnections from '@store/roadmap-refactor/render/rendered-connections';
import { getShift } from '@store/roadmap-refactor/misc/key-press-store';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export const triggerNodeConnectionsRerender = (nodeId: string) => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  node.connections.forEach((connectionId) => {
    triggerConnectionRerender(connectionId);
  });
};

let firstDrag = true;

export const triggerAllConnectionsRerender = () => {
  const { connections } = renderedConnections.get();
  connections.forEach((connId) => {
    triggerConnectionRerender(connId);
  });
};

export const propagateDraggingToChildrenNodes = (
  draggingBehavior: DraggingBehavior,
  transformX: number,
  transformY: number
) => {
  const node = getNodeByIdRoadmapSelector(draggingBehavior.draggingElementId);
  const childrenIds = getChildrenRenderedTraceback(node.id);

  childrenIds.forEach((childId) => {
    const child = getNodeByIdRoadmapSelector(childId);
    const { id } = child;

    const elementIdentifier = draggingBehavior.draggingElementIdentifier;

    const sel = document.getElementById(`${elementIdentifier}${id}`);
    const obj = d3.select(sel);

    obj.style('transform', `translate(${transformX}px, ${transformY}px)`);
  });
};

export const addDragabilityProtocol = (draggingBehavior: DraggingBehavior) => {
  // refactored dragability with dragging behavior and generalized
  const id = draggingBehavior.draggingElementId;
  const elementIdentifier = draggingBehavior.draggingElementIdentifier;

  const offset = { x: 0, y: 0 };
  const newPos = { x: 0, y: 0 };
  const initialPos = { x: 0, y: 0 };

  const currentCoordsStrategy =
    getCurrentCoordsStrategyFactory(draggingBehavior);
  const coordinatesAdapterStrategy =
    getCoordinatesAdapterStrategyFactory(draggingBehavior);
  const draggingStrategy = getDraggingStrategyFactory(draggingBehavior);
  const draggingEndStrategy = getDraggingEndFactory(draggingBehavior);

  let isRecursive = false;

  const drag = d3
    .drag()
    // eslint-disable-next-line func-names
    .on('start', function (event) {
      const { x: originalX, y: originalY } = event;
      // coordinates of the node in the original reference system
      const currentCoords = currentCoordsStrategy();
      // also account for the difference between rendering relative to center and relative to top left corner
      const { x, y } = coordinatesAdapterStrategy(originalX, originalY);

      const offsetX = x - currentCoords.x;
      const offsetY = y - currentCoords.y;

      offset.x = offsetX;
      offset.y = offsetY;

      initialPos.x = currentCoords.x;
      initialPos.y = currentCoords.y;

      newPos.x = x - offset.x;
      newPos.y = y - offset.y; // offsets are used to sync the mouse position with the dragging position

      isRecursive =
        getShift() && draggingBehavior.draggingElementType === 'node';

      if (isRecursive) {
        const children = getChildrenRenderedTraceback(id);
        // add dragging Effect
        children.forEach((childId) => {
          const child = getNodeByIdRoadmapSelector(childId);
          const { id: idChild } = child;
          appendDraggingRecursiveEffect(idChild);
          triggerNodeRerender(idChild);
        });
        appendDraggingRecursiveEffect(id);
        triggerNodeRerender(id);
      }
    })
    // eslint-disable-next-line func-names
    .on('drag', function (event) {
      // use adapter for coordinates to sync with the dragging space (eg nodes-page/nested reusable-components-page behave differently)
      // put here the notification
      if (firstDrag === true) {
        firstDrag = false;
      }

      const { x: adaptedX, y: adaptedY } = coordinatesAdapterStrategy(
        event.x,
        event.y
      );

      const offsetAdaptedX = adaptedX - offset.x;
      const offsetAdaptedY = adaptedY - offset.y;

      const { x, y } = draggingStrategy(offsetAdaptedX, offsetAdaptedY);

      // we set the new coordinates to the element
      newPos.x = x;
      newPos.y = y; // offsets are used to sync the mouse position with the dragging position

      // at the end we simply do not substract the offset and the element will be placed properly

      // we temporarily update the position to emulate the dragging, which will then be applied to the actual element
      // after its finished
      const sel = document.getElementById(`${elementIdentifier}${id}`);
      const obj = d3.select(sel);

      const displacementVectorX = newPos.x - initialPos.x;
      const displacementVectorY = newPos.y - initialPos.y;
      obj.style(
        'transform',
        `translate(${displacementVectorX}px, ${displacementVectorY}px)`
      );
      isRecursive &&
        propagateDraggingToChildrenNodes(
          draggingBehavior,
          displacementVectorX,
          displacementVectorY
        );

      // we apply the translate relative to initial position because you can imagine dragging like an arrow
      // from initial position to final position and after we are done the arrow is translated in actual
      // coordinates changes

      // update connections here
      draggingBehavior.draggingElementType === 'node' &&
        triggerAllConnectionsRerender();
    })
    // eslint-disable-next-line func-names
    .on('end', function () {
      // chunk recalculations are integrated in the coordinates setter strategy
      draggingEndStrategy(newPos.x, newPos.y);
      deleteAllSnappings();
      if (isRecursive) {
        draggingEndChildrenTraceback(draggingBehavior);
        const children = getChildrenRenderedTraceback(id);
        children.forEach((childId) => {
          deleteDraggingRecursiveEffect(childId);
        });
      }
    });

  function updateDraggabilityAllowed(allowed: boolean) {
    const nodeSelection = d3
      .selectAll(draggingBehavior.draggingElementIdentifier)
      .select(`#${elementIdentifier}${id}`);

    if (allowed) {
      nodeSelection.call(drag);
    } else {
      nodeSelection.on('.drag', null);
    }
  }
  updateDraggabilityAllowed(false); // draggability is disabled by default but set to true at rendering
  setElementDraggableUpdateCallback(id, updateDraggabilityAllowed); //  callback to update draggability from the store directly
};
