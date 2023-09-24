import * as d3 from 'd3';
import {
  deleteDraggingRecursiveEffect,
  appendDraggingRecursiveEffect,
  storeNodeEffects,
} from '@store/roadmap-refactor/elements-editing/store-node-effects';
import { deleteAllSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import {
  setElementDraggable,
  setElementDraggableUpdateCallback,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
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
import { getShift } from '@store/roadmap-refactor/misc/key-press-store';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';
import { getRenderingEngineDraggingElementIdentifier } from '@components/roadmap/rendering-engines/store-rendering-engine';
import {
  endRecordResizeOrDrag,
  startRecordResizeOrDrag,
} from '@src/to-be-organized/undo-redo/recorders';
import { triggerAllConnectionsRerender } from '@src/to-be-organized/triggering-stuff-alert/trigger-connections';

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

    const elementIdentifier = getRenderingEngineDraggingElementIdentifier();

    const sel = document.getElementById(`${elementIdentifier}${id}`);
    const obj = d3.select(sel);

    obj.style('transform', `translate(${transformX}px, ${transformY}px)`);
  });
};

export const addDragabilityProtocol = (draggingBehavior: DraggingBehavior) => {
  // refactored dragability with dragging behavior and generalized
  const id = draggingBehavior.draggingElementId;

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

  function startDragging(event) {
    const { x: originalX, y: originalY } = event.subject;
    /* I have a vague idea why this works but further  inspection is required.
    Not taking subject coords will break the shift key press / unpress while dragging
    DO NOT CHANGE SUBJECT AND IF YOU DO, MAY GOD HAVE MERCY ON YOUR SOUL
    --- a tormented developer
    */

    // coordinates of the node in the original reference system
    const currentCoords = currentCoordsStrategy();
    // also account for the difference between rendering relative to center and relative to top left corner
    const { x, y } = coordinatesAdapterStrategy(originalX, originalY);
    const type = draggingBehavior.draggingElementType;
    if (type === 'node') {
      startRecordResizeOrDrag(id);
    }

    const offsetX = x - currentCoords.x;
    const offsetY = y - currentCoords.y;

    offset.x = offsetX;
    offset.y = offsetY;

    initialPos.x = currentCoords.x;
    initialPos.y = currentCoords.y;

    newPos.x = x - offset.x;
    newPos.y = y - offset.y; // offsets are used to sync the mouse position with the dragging position

    isRecursive = getShift() && type === 'node';

    if (isRecursive) {
      const children = getChildrenRenderedTraceback(id);
      // add dragging Effect
      console.log('children', children);
      children.forEach((childId) => {
        const child = getNodeByIdRoadmapSelector(childId);
        const { id: idChild } = child;
        appendDraggingRecursiveEffect(idChild);
        triggerNodeRerender(idChild);
      });
      appendDraggingRecursiveEffect(id);
      triggerNodeRerender(id);
    } else {
      appendDraggingRecursiveEffect(id);
      if (type === 'node') {
        triggerNodeRerender(id);
      }
    }
  }

  function onDragging(event) {
    // use adapter for coordinates to sync with the dragging space (eg nodes-page/nested reusable-components-page behave differently)

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

    const elementIdentifier = getRenderingEngineDraggingElementIdentifier();
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
      (() => {
        triggerAllConnectionsRerender();
      })();
  }

  function endDragging() {
    // chunk recalculations are integrated in the coordinates setter strategy
    draggingEndStrategy(newPos.x, newPos.y);
    deleteAllSnappings();

    const type = draggingBehavior.draggingElementType;
    if (type === 'node') {
      endRecordResizeOrDrag(id);
    }

    if (isRecursive) {
      draggingEndChildrenTraceback(draggingBehavior);
      const children = getChildrenRenderedTraceback(id);
      children.forEach((childId) => {
        deleteDraggingRecursiveEffect(childId);
      });
    } else {
      deleteDraggingRecursiveEffect(id);
    }
  }

  const drag = d3
    .drag()
    // eslint-disable-next-line func-names
    .on('start', function (event) {
      startDragging(event);
    })
    // eslint-disable-next-line func-names
    .on(
      'drag',
      throttle(function (event) {
        // runs at 60fps
        if (isRecursive !== getShift()) {
          endDragging();
          startDragging(event);
        } else {
          onDragging(event);
        }
      }, 1000 / 60)
    )
    // eslint-disable-next-line func-names
    .on('end', function () {
      endDragging();
    });

  function updateDraggabilityAllowed(allowed: boolean) {
    const elementIdentifier = getRenderingEngineDraggingElementIdentifier();
    const selector = `#${elementIdentifier}${id}`;
    const nodeSelection = d3.select(selector);

    if (allowed) {
      nodeSelection.call(drag);
    } else {
      nodeSelection.on('.drag', null);
    }
  }
  updateDraggabilityAllowed(false); // draggability is disabled by default but set to true at rendering
  setElementDraggableUpdateCallback(id, updateDraggabilityAllowed); //  callback to update draggability from the store directly
  setElementDraggable(id, false);
};
