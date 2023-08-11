import {
  getElementDraggable,
  setDraggableElementForNodeWithId,
  setRoadmapRootRenderDraggable,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { setSelectedNodeId } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import roadmapState from '@store/roadmap/data/roadmap_state';
import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import {
  setEditorClosedEffect,
  setEditorOpenEffect,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { triggerAllNodesRerender } from '@store/roadmap-refactor/render/rerender-triggers';
import { getElementDiv } from '@store/roadmap-refactor/elements-editing/elements-divs';
import {
  effectBorderBlack,
  effectBorderBlue,
} from '@src/to-be-organized/nodeview/effects';

export function getOnMouseOutActionEdit(nodeId): () => void {
  const div = getElementDiv(nodeId);
  return () => {
    effectBorderBlack(div);
  };
}

export function openEditorProtocol(nodeId: string) {
  setDisplayPageType('editor');
  setSelectedNodeId(nodeId);
  setDraggableElementForNodeWithId(nodeId);
  setEditorOpenEffect(nodeId);
  // remove any potential drag effects from the root
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
  return () => {};
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
