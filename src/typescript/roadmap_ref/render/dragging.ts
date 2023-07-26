import * as d3 from 'd3';
import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import { changeNodeCoords } from '@src/typescript/roadmap/roadmap-edit-logic-decorated';
import { setSelection } from '@store/roadmap-refactor/render/selection';
import { getTransformXY } from '@src/typescript/roadmap_ref/render/coord-calc';
import { updateConnections } from '@src/typescript/roadmap_ref/render/connections';
import { setDisplayTitlesFalse } from '@store/roadmap/sidebar/displayTitle';

export function moveOnDrag(id: string, newPos: { x: number; y: number }) {
  const sel = document.getElementById(`group${id}`);
  const obj = d3.select(sel);
  obj.attr('transform', `translate(${newPos.x}, ${newPos.y})`);
  // syncs the tooltip movement with the node movement
  const tooltip = document.getElementById(`tooltip${id}`);
  const tooltipObj = d3.select(tooltip);
  tooltipObj.attr(
    'transform',
    `translate(${newPos.x - 20}, ${newPos.y - 128})`
  );
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
