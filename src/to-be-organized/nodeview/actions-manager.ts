import {
  actionStrategyDoNothing,
  actionStrategyOpenLink,
  actionStrategyOpenTab,
  IActionStrategy,
} from '@src/typescript/roadmap_ref/node/core/actions/strategies';
import {
  setDraggableElementForNodeWithId,
  setRoadmapRootRenderDraggable,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { setSelectedNodeId } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import roadmapState from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import {
  getNodeAbsoluteCoords,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  getElementHasEffect,
  setEditorClosedEffect,
  setEditorOpenEffect,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { triggerAllNodesRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getElementDiv } from '@store/roadmap-refactor/elements-editing/elements-divs';
import {
  effectBorderBlack,
  effectBorderBlue,
} from '@src/to-be-organized/nodeview/effects';
import { triggerMoveRoadmapTo } from '@store/roadmap-refactor/misc/misc-params-store';
import { HashMapWithKeys } from '@type/roadmap/stores/roadmap';
import { IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions/core';

export function getOnMouseOutActionEdit(nodeId): () => void {
  const div = getElementDiv(nodeId);
  return () => {
    if (!getElementHasEffect(nodeId, 'dragging-recursive')) {
      effectBorderBlack(div);
    }
  };
}

export function moveRoadmapToNode(nodeId: string) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { coords, width, height } = node.data;

  const wOffsetX = window.innerWidth / 2;
  const wOffsetY = window.innerHeight / 2;

  const { x, y } = getNodeAbsoluteCoords(nodeId);
  const tracebackOffsetX = x;
  const tracebackOffsetY = y;

  triggerMoveRoadmapTo(
    tracebackOffsetX - wOffsetX + 250, // account for editor width
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
  return () => openEditorProtocol(nodeId);
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
  // could be replaced with a onClick store that holds onClick for all nodes-page but that would mean a ton of side effects
  // when changing from view to edit or making a node draggable
  const state = roadmapState.get().editing;
  return state ? getOnClickActionEdit(nodeId) : getOnClickActionView(nodeId);
}

export function getOnMouseOverActionEdit(nodeId): () => void {
  const div = getElementDiv(nodeId);
  return () => {
    if (!getElementHasEffect(nodeId, 'dragging-recursive')) {
      effectBorderBlue(div);
    }
  };
}

export function getOnMouseOverActionView(nodeId): () => void {
  return () => {
    const div = getElementDiv(nodeId);
    effectBorderBlue(div);
  };
}

export function getOnMouseOverAction(nodeId: string): () => void {
  const state = roadmapState.get().editing;
  return state
    ? getOnMouseOverActionEdit(nodeId)
    : getOnMouseOverActionView(nodeId);
}

export function getOnMouseOutActionView(nodeId): () => void {
  return () => {
    const div = getElementDiv(nodeId);
    effectBorderBlack(div);
  };
}

export function getOnMouseOutAction(nodeId: string): () => void {
  const state = roadmapState.get().editing;
  return state
    ? getOnMouseOutActionEdit(nodeId)
    : getOnMouseOutActionView(nodeId);
}
