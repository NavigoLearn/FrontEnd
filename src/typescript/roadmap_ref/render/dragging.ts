import * as d3 from 'd3';
import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import { changeNodeCoords } from '@src/typescript/roadmap/roadmap-edit-logic-decorated';
import { setSelection } from '@store/roadmap-refactor/render/selection';
import { getTransformXY } from '@src/typescript/roadmap_ref/render/coord-calc';
import { updateConnections } from '@src/typescript/roadmap_ref/render/connections';
import { setDisplayTitlesFalse } from '@store/roadmap/sidebar/displayTitle';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { setElementDraggableUpdateCallback } from '@store/roadmap-refactor/elements-editing/draggable-elements';

export function moveOnDrag(id: string, newPos: { x: number; y: number }) {
  const sel = document.getElementById(`group${id}`);
  const obj = d3.select(sel);
  obj.attr('transform', `translate(${newPos.x}, ${newPos.y})`);
}

export const addDraggabilityFlow = (id: string, allowed: boolean) => {
  const nodeSelection = d3.selectAll('g').select(`#group${id}`);
  const offsets = { x: 0, y: 0 };
  const newPos = { x: 0, y: 0 };
  const drag = d3
    .drag()
    // eslint-disable-next-line func-names
    .on('start', function (event) {
      // sets the
      setSelection(id);
      // coordinates of mouse click in the original reference system
      const { x } = event;
      const { y } = event;
      // coordinates of the node in the original reference system
      const transform = d3.select(this).attr('transform');
      const { x: nodeX, y: NodeY } = getTransformXY(transform);
      const offsetX = x - nodeX;
      const offsetY = y - NodeY;
      offsets.x = offsetX;
      offsets.y = offsetY;
      newPos.x = nodeX;
      newPos.y = NodeY;
      // doesnt display sidebar titles while dragging
      setDisplayTitlesFalse();
    })
    // eslint-disable-next-line func-names
    .on('drag', function (event) {
      // event x and event y are measures from the top left corner of the svg
      newPos.x = event.x - offsets.x;
      newPos.y = event.y - offsets.y; // offsets used only for dragging purposes not for actual save

      // triggers the update of the connections
      moveOnDrag(id, newPos);
      updateConnections();
    })
    // eslint-disable-next-line func-names
    .on('end', function () {
      if (
        roadmapEdit.get().nodes[id].x === newPos.x &&
        roadmapEdit.get().nodes[id].y === newPos.y
      )
        return;
      changeNodeCoords(id, newPos.x, newPos.y);
    });

  if (allowed) {
    nodeSelection.call(drag);
  } else {
    nodeSelection.on('.drag', null);
  }
};

export const addDragabilityProtocol = (draggingBehavior: DraggingBehavior) => {
  // refactored dragability with dragging behavior and generalized
  const id = draggingBehavior.draggingElementId;
  const elementIdentifier = draggingBehavior.draggingElementIdentifier;

  const nodeSelection = d3
    .selectAll(draggingBehavior.draggingElementIdentifier)
    .select(`#${elementIdentifier}${id}`);

  const offset = { x: 0, y: 0 };
  const newPos = { x: 0, y: 0 };
  const initialPos = { x: 0, y: 0 };

  const drag = d3
    .drag()
    // eslint-disable-next-line func-names
    .on('start', function (event) {
      const { x: originalX, y: originalY } = event;
      // coordinates of the node in the original reference system
      const currentCoords = draggingBehavior.getCurrentCoords(); //  offset calculated from this
      // also account for the difference between rendering relative to center and relative to top left corner
      const { x, y } = draggingBehavior.coordinatesAdapter(
        originalX,
        originalY
      );

      const offsetX = x - currentCoords.x;
      const offsetY = y - currentCoords.y;

      offset.x = offsetX;
      offset.y = offsetY;

      initialPos.x = currentCoords.x;
      initialPos.y = currentCoords.y;

      newPos.x = x - offset.x;
      newPos.y = y - offset.y; // offsets are used to sync the mouse position with the dragging position
    })
    // eslint-disable-next-line func-names
    .on('drag', function (event) {
      // use adapter for coordinates to sync with the dragging space (eg nodes/nested components behave differently)
      const { x: adaptedX, y: adaptedY } = draggingBehavior.coordinatesAdapter(
        event.x,
        event.y
      );
      // we apply the strategy to the new coordinates ( for gridding, snapping, etc)
      const { x, y } = draggingBehavior.draggingStrategy(adaptedX, adaptedY);

      // we set the new coordinates to the element
      newPos.x = x - offset.x;
      newPos.y = y - offset.y; // offsets are used to sync the mouse position with the dragging position

      // at the end we simply do not substract the offset and the element will be placed properly

      // we temporarily update the position to emulate the dragging, which will then be applied to the actual element
      // after its finished
      const sel = document.getElementById(`${elementIdentifier}${id}`);
      const obj = d3.select(sel);
      obj.style(
        'transform',
        `translate(${newPos.x - initialPos.x}px, ${newPos.y - initialPos.y}px)`
      );
      // we apply the translate relative to initial position because you can imagine dragging like an arrow
      // from initial position to final position and after we are done the arrow is translated in actual
      // coordinates changes

      // update connections here
      // ...
    })
    // eslint-disable-next-line func-names
    .on('end', function () {
      draggingBehavior.coordinatesSetter(newPos.x, newPos.y);
    });

  function updateDraggabilityAllowed(allowed: boolean) {
    if (allowed) {
      nodeSelection.call(drag);
    } else {
      nodeSelection.on('.drag', null);
    }
  }
  updateDraggabilityAllowed(true);
  setElementDraggableUpdateCallback(id, updateDraggabilityAllowed); //  callback to update draggability from the store directly
};
