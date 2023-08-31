import {
  actionStrategyDoNothing,
  actionStrategyOpenLink,
  actionStrategyOpenTab,
  IActionStrategy,
} from '@src/typescript/roadmap_ref/node/core/actions/strategies';
import {
  setDraggableElementForNodeWithId,
  closeEditorDraggabilitySettings,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import {
  getDisplayPageType,
  setDisplayPageType,
} from '@store/roadmap-refactor/display/display-manager';
import { setSelectedNodeId } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import roadmapStateStore, {
  getIsEditable,
  getIsEditing,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import {
  getNodeAbsoluteCoordsCenter,
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
  effectBorderTransparent,
} from '@src/to-be-organized/nodeview/effects';
import { triggerMoveRoadmapTo } from '@store/roadmap-refactor/misc/misc-params-store';
import { HashMapWithKeys } from '@type/roadmap/misc';
import { IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions/core';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { getScaleSafari } from '@store/roadmap-refactor/misc/scale-safari-store';
import { getViewport } from '@store/roadmap-refactor/misc/viewport-coords-store';
import {
  getEditingState,
  IEditingState,
  setEditingState,
} from '@store/roadmap-refactor/editing/editing-state';
import {
  clearSelectedConnection,
  setSelectedConnectionForChildNode,
} from '@components/roadmap/connections/connection-editing/connection-store';

export function getOnMouseOutActionEdit(nodeId): () => void {
  const div = getElementDiv(nodeId);
  return () => {
    if (!getElementHasEffect(nodeId, 'dragging-recursive')) {
      effectBorderTransparent(div);
    }
  };
}

export function moveRoadmapToNode(nodeId: string) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { coords, width, height } = node.data;

  const scale = getScaleSafari();
  const viewport = getViewport();

  // 500 accounts for editor width
  const wOffsetX =
    (viewport.endX - viewport.startX - 500 / scale + node.data.width / 2) / 2;
  const wOffsetY = (viewport.endY - viewport.startY) / 2;

  const { x, y } = getNodeAbsoluteCoordsCenter(nodeId);
  const tracebackOffsetX = (x - wOffsetX) * scale;
  const tracebackOffsetY = (y - wOffsetY) * scale;

  triggerMoveRoadmapTo(
    tracebackOffsetX, // account for editor width
    tracebackOffsetY,
    1
  );
}

export function openEditorProtocol(nodeId: string) {
  setDisplayPageType('editor');
  setSelectedNodeId(nodeId);
  clearSelectedConnection();
  setEditingState('nodes');
  setDraggableElementForNodeWithId(nodeId);
  setEditorOpenEffect(nodeId);
  moveRoadmapToNode(nodeId);
  getOnMouseOutActionEdit(nodeId)();
  triggerAllNodesRerender();
}

export function closeEditorProtocol() {
  if (!(getDisplayPageType() === 'editor')) return;
  setDisplayPageType('closed');
  closeEditorDraggabilitySettings();
  setEditorClosedEffect();
  triggerAllNodesRerender();
}

export function getOnClickActionEdit(nodeId): () => void {
  // const editingState = getEditingState();

  return () => {
    openEditorProtocol(nodeId);
  };
}

export function getOnClickActionView(nodeId): () => void {
  // map the node action
  const node = getNodeByIdRoadmapSelector(nodeId);
  const action = node.actions.onClick;
  const actionMap: HashMapWithKeys<IActionTypes, IActionStrategy> = {
    'Do nothing': actionStrategyDoNothing,
    'Open link': actionStrategyOpenLink,
    'Open attachment': actionStrategyOpenTab,
  };
  return () => {
    actionMap[action](nodeId);
  };
}
export function getOnClickAction(nodeId: string): () => void {
  // could be replaced with a onClick store that holds onClick for all nodes-page but that would mean a ton of side effects
  // when changing from view to edit or making a node draggable
  const state = getIsEditable();
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
  const state = getIsEditable();
  return state
    ? getOnMouseOverActionEdit(nodeId)
    : getOnMouseOverActionView(nodeId);
}

export function getOnMouseOutActionView(nodeId): () => void {
  return () => {
    const div = getElementDiv(nodeId);
    effectBorderTransparent(div);
  };
}

export function getOnMouseOutAction(nodeId: string): () => void {
  const state = getIsEditing();
  return state
    ? getOnMouseOutActionEdit(nodeId)
    : getOnMouseOutActionView(nodeId);
}
