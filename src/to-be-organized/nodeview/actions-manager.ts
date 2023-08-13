import {
  actionStrategyDoNothing,
  actionStrategyOpenLink,
  actionStrategyOpenTab,
  IActionStrategy,
} from '@src/typescript/roadmap_ref/node/core/actions/strategies';
import {
  getElementDraggable,
  setDraggableElementForNodeWithId,
  setRoadmapRootRenderDraggable,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { setSelectedNodeId } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import roadmapState from '@store/roadmap/data/roadmap_state';
import {
  getNodeByIdRoadmapSelector,
  tracebackNodeToRoot,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import {
  setEditorClosedEffect,
  setEditorOpenEffect,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { triggerAllNodesRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getElementDiv } from '@store/roadmap-refactor/elements-editing/elements-divs';
import {
  effectBorderBlack,
  effectBorderBlue,
} from '@src/to-be-organized/nodeview/effects';
import { triggerMoveRoadmapTo } from '@store/roadmap-refactor/misc/miscParams';
import { HashMapWithKeys } from '@type/roadmap/stores/roadmap';
import { IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions/core';

export function getOnMouseOutActionEdit(nodeId): () => void {
  const div = getElementDiv(nodeId);
  return () => {
    effectBorderBlack(div);
  };
}

export function moveRoadmapToNode(nodeId: string) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { coords, width, height } = node.data;
  const { nestedFlag } = node.flags;
  const { x, y } = coords;

  const wOffsetX = window.innerWidth / 2;
  const wOffsetY = window.innerHeight / 2;

  let tracebackOffsetX = 0;
  let tracebackOffsetY = 0;

  const traceback = tracebackNodeToRoot(nodeId);
  traceback.push(nodeId);
  // gets last element of traceback
  traceback.forEach((traceNodeId) => {
    const traceNode = getNodeByIdRoadmapSelector(traceNodeId);
    const { coords: traceCoords } = traceNode.data;
    const { x: traceX, y: traceY } = traceCoords;
    const { width: traceWidth, height: traceHeight } = traceNode.data;
    tracebackOffsetX += traceX + traceWidth / 2;
    tracebackOffsetY += traceY + traceHeight / 2;
  });

  triggerMoveRoadmapTo(
    // rootX - window.innerWidth / 2 + rootWidth / 2 + x + width / 2,
    // rootY - window.innerHeight / 2 + rootHeight / 2 + y + height / 2,
    tracebackOffsetX - wOffsetX,
    tracebackOffsetY - wOffsetY,
    1
  );
}

export function openEditorProtocol(nodeId: string) {
  setDisplayPageType('editor');
  setSelectedNodeId(nodeId);
  setDraggableElementForNodeWithId(nodeId);
  setEditorOpenEffect(nodeId);
  moveRoadmapToNode(nodeId);
  getOnMouseOutActionEdit(nodeId)();
  triggerAllNodesRerender();
}

export function closeEditorProtocol() {
  setDisplayPageType('closed');
  setRoadmapRootRenderDraggable();
  setEditorClosedEffect();
  triggerAllNodesRerender();
}

export function getOnClickActionEdit(nodeId): () => void {
  const draggable = getElementDraggable(nodeId);
  return draggable ? () => openEditorProtocol(nodeId) : () => {};
}
export function getOnClickActionView(nodeId): () => void {
  // map the node action
  const node = getNodeByIdRoadmapSelector(nodeId);
  const action = node.actions.onClick;
  const actionMap: HashMapWithKeys<IActionTypes, IActionStrategy> = {
    'Do nothing': actionStrategyDoNothing,
    'Open link': actionStrategyOpenLink,
    'Open Tab': actionStrategyOpenTab,
  };
  return () => {
    actionMap[action](nodeId);
  };
}
export function getOnClickAction(nodeId: string): () => void {
  // could be replaced with a onClick store that holds onClick for all nodes but that would mean a ton of side effects
  // when changing from view to edit or making a node draggable
  const state = roadmapState.get().editing;
  return state ? getOnClickActionEdit(nodeId) : getOnClickActionView(nodeId);
}

export function getOnMouseOverActionEdit(nodeId): () => void {
  const draggable = getElementDraggable(nodeId);
  const div = getElementDiv(nodeId);
  return draggable
    ? () => {
        effectBorderBlue(div);
      }
    : () => {};
}

export function getOnMouseOverActionView(nodeId): () => void {
  return () => {};
}

export function getOnMouseOverAction(nodeId: string): () => void {
  const state = roadmapState.get().editing;
  return state
    ? getOnMouseOverActionEdit(nodeId)
    : getOnMouseOverActionView(nodeId);
}

export function getOnMouseOutActionView(nodeId): () => void {
  return () => {};
}

export function getOnMouseOutAction(nodeId: string): () => void {
  const state = roadmapState.get().editing;
  return state
    ? getOnMouseOutActionEdit(nodeId)
    : getOnMouseOutActionView(nodeId);
}
