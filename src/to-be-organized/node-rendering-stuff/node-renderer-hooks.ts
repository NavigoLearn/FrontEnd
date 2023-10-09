import { useStore } from '@nanostores/react';
import {
  storeConnectionSelected,
  storeConnectionSelectedParent,
  storeConnectionSelectedChild,
} from '@components/roadmap/connections/connection-editing/connection-store';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  appendStatusEffect,
  applyElementEffects,
  deleteStatusEffectAll,
  getElementHasEffect,
  removeHighlightNodeEffects,
  setNodeEffectsInitialEmpty,
  storeNodeEffects,
} from '@store/roadmap-refactor/elements-editing/store-node-effects';
import { setElementDiv } from '@store/roadmap-refactor/elements-editing/elements-gs';
import { handleDragabilityRecalculationOnChunking } from '@src/typescript/roadmap_ref/dragging/misc';
import { triggerAllConnectionsRerender } from '@src/to-be-organized/triggering-stuff-alert/trigger-connections';
import { setTriggerRender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { useStateWithSideEffects } from '@hooks/useStateWithSideEffects';
import { useStateTimed } from '@hooks/useStateTimed';
import { deleteAllSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { useIsLoaded } from '@hooks/useIsLoaded';
import {
  getHideProgress,
  getIsEditing,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import scaleSafariStore from '@store/roadmap-refactor/misc/scale-safari-store';
import {
  selectNodeColorFromScheme,
  selectNodeColorTextBorder,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/theme-controler';
import { hexAddAlpha } from '@src/typescript/roadmap_ref/utils';
import { getElementIsDraggable } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { getRoadmapNodeProgress } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import { getNodeOpacity } from '@src/to-be-organized/node-rendering-stuff/node-render-logic';
import { afterEventLoop } from '@src/typescript/utils/misc';
import {
  getSortedBeforeRenderEvents,
  setNodeEventsInitialEmpty,
} from '@src/to-be-organized/node-rendering-stuff/store-node-events';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import { storeRenderingEngine } from '@components/roadmap/rendering-engines/store-rendering-engine';
import storeEditorSelectedData, {
  getSelectedNodeId,
} from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import storeDisplayManager, {
  getDisplayPageType,
} from '@store/roadmap-refactor/display/display-manager';

type INodeDataProcessed = {
  isSubNode: boolean;
  isRootNode: boolean;
  width: number;
  height: number;
  opacity: number;
  color: string;
  bgOpacity: number;
  subNodeIds: string[];
  shadowClass: string;
  borderStyle: string;
};

export function useNodeData(node: NodeClass): INodeDataProcessed {
  const isSubNode = node.flags.subNodeFlag;
  const isRootNode = node.flags.renderedOnRoadmapFlag;
  if (isRootNode === isSubNode)
    throw new Error('Node is either root or subnode, but not both');

  const {
    width: widthData,
    height: heightData,
    opacity: opacityData,
    colorType: colorTypeData,
    backgroundOpacity: backgroundOpacityData,
  } = node.data;

  // ensure node has all data it needs
  const width = widthData ?? 200;
  const height = heightData ?? 50;
  const opacity = opacityData ?? 100;
  const colorType = colorTypeData ?? 'primary';
  const backgroundOpacity = backgroundOpacityData ?? 100;
  const bgOpacity = backgroundOpacity / 100;

  const { subNodeIds } = node;

  const color = selectNodeColorFromScheme(
    getColorThemeFromRoadmap(),
    colorType
  );

  const borderColor = selectNodeColorTextBorder(
    getColorThemeFromRoadmap(),
    colorType
  );

  const shadowClass =
    // eslint-disable-next-line no-nested-ternary
    bgOpacity === 0 ? 'shadow-none' : isSubNode ? 'shadow-md' : 'shadow-lg';

  const borderStyle =
    borderColor === '#none'
      ? `2px solid transparent`
      : `2px solid ${hexAddAlpha(borderColor, bgOpacity)}`;

  return {
    isSubNode,
    isRootNode,
    width,
    height,
    opacity,
    color,
    bgOpacity,
    subNodeIds,
    shadowClass,
    borderStyle,
  };
}

export function useSelectedConnectionData() {
  const connectionSelectedChildId = useStore(storeConnectionSelectedChild);
  const connectionSelectedParentId = useStore(storeConnectionSelectedParent);
  const currentConnection = useStore(storeConnectionSelected);
  return {
    connectionSelectedChildId,
    connectionSelectedParentId,
    currentConnection,
  };
}

function handleSubNodeCoords(
  node: NodeClass,
  centeringOffset: ICoords
): ICoords {
  const rawNodeCoords = {
    x: node.data.coords.x,
    y: node.data.coords.y,
  };

  const centeredNodeCoords = {
    x: rawNodeCoords.x + centeringOffset.x,
    y: rawNodeCoords.y + centeringOffset.y,
  };

  return centeredNodeCoords;
}

function handleRootNodeCoords(node, centerOffset): ICoords {
  // centering offset will always be 0,0 since the foreignObject size is equal to the node size
  // we dont add the coords of the node to the centering offset since the group in the Wrapper
  // for the node is already translated to its position

  return centerOffset;
}

export function useNodeCalculateCoords(node: NodeClass, centerOffset: ICoords) {
  // the offset for the nodes-page rendered directly on the roadmap is calculated directly
  // on its group and foreign object in NodeManager. This is why you need to treat the coords
  // from subNodes which don't have their own foreign object and are divs relative to the parent node

  const isSubNode = node.flags.subNodeFlag;
  const { width, height } = node.data;

  const centeringOffset = {
    x: centerOffset.x - width / 2,
    y: centerOffset.y - height / 2,
  };

  const centeredCoords = isSubNode
    ? handleSubNodeCoords(node, centeringOffset)
    : handleRootNodeCoords(node, centeringOffset);

  return centeredCoords;
}

export function useNodeSideEffects(node: NodeClass) {
  const nodeId = node.id;

  const nodeDivRef = useRef<HTMLDivElement>(null);
  const rerender = useTriggerRerender();
  const loaded = useIsLoaded();

  useEffect(() => {
    // node can change when you apply a template
    setNodeEffectsInitialEmpty(nodeId);
    setElementDiv(nodeId, nodeDivRef.current);
    handleDragabilityRecalculationOnChunking(node);

    if (loaded) {
      triggerAllConnectionsRerender();
    }
  }, [node]);

  useEffect(() => {
    setNodeEventsInitialEmpty(nodeId);
    if (node.flags.renderedOnRoadmapFlag) return;
    setTriggerRender(node.id, rerender);
  }, []);

  const [mouseOver, setMouseOver] = useStateWithSideEffects(false, () => {
    if (getElementHasEffect(nodeId, 'highlight-node')) {
      removeHighlightNodeEffects(nodeId);
    }
  });
  const [isResizing, setIsResizing] = useStateTimed(false, 500, () => {
    deleteAllSnappings();
  });

  return {
    loaded,
    nodeDivRef,
    mouseOver,
    setMouseOver,
    isResizing,
    setIsResizing,
  };
}

export function useNodeExternalData() {
  const editing = getIsEditing();
  const { scale, isSafari } = useStore(scaleSafariStore);
  const { renderingEngineType, optimized } = useStore(storeRenderingEngine);
  return {
    editing,
    scale,
    isSafari,
    optimized,
  };
}

export function useNodeRuntimeProperties(nodeId: string) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const isCurrentlyDragged = getElementHasEffect(nodeId, 'dragging-recursive');
  const isDraggable = getElementIsDraggable(nodeId);
  const selectedEditorData = useStore(storeEditorSelectedData);
  const isSelected =
    selectedEditorData.selectedNodeId === nodeId &&
    getDisplayPageType() !== 'closed';

  let cursor = '';

  if (getIsEditing()) {
    cursor = isCurrentlyDragged ? 'cursor-grab' : 'cursor-pointer';
  } else {
    const { onClick } = node.actions;
    if (onClick === 'Do nothing') {
      cursor = 'cursor-default';
    } else if (onClick === 'Open attachment') {
      cursor = 'cursor-pointer';
    } else if (onClick === 'Open link') {
      cursor = 'cursor-pointer';
    }
  }

  return {
    isCurrentlyDragged,
    isDraggable,
    cursor,
    isSelected,
  };
}
export function useNodeApplyStatusAndEffects(
  node: NodeClass,
  nodeDivRef: React.MutableRefObject<HTMLDivElement | null>,
  nodeDataProcessed: INodeDataProcessed,
  centeredCoords: ICoords,
  loaded: boolean
) {
  const editing = getIsEditing();
  const nodeId = node.id;
  const {
    width,
    height,
    bgOpacity,
    color,
    borderStyle,
    shadowClass,
    subNodeIds,
    isSubNode,
    opacity,
    isRootNode,
  } = nodeDataProcessed;

  function appendNodeMarkAsDone(currentNode: NodeClass) {
    const status = getRoadmapNodeProgress(nodeId);
    if (status === 'Completed') {
      appendStatusEffect(nodeId, 'mark-as-completed');
    }
    if (status === 'In Progress') {
      appendStatusEffect(nodeId, 'mark-as-progress');
    }
    if (status === 'Skip') {
      appendStatusEffect(nodeId, 'mark-as-skipped');
    }
    if (status === 'Status') {
      appendStatusEffect(nodeId, 'mark-as-status');
    }
  }
  const style = {
    // color: textColor,
    backgroundColor: hexAddAlpha(color, bgOpacity),
    width,
    height,
    // top: centeredCoords.y,
    // left: centeredCoords.x,
    opacity: `${getNodeOpacity(node)}`,
    border: borderStyle,
  };

  const applyStyle = () => {
    const element = nodeDivRef.current;
    Object.assign(element.style, style);
  };

  function handleProgressStatusEffects() {
    editing && deleteStatusEffectAll(nodeId);
    loaded && !editing && !getHideProgress() && appendNodeMarkAsDone(node);
    getHideProgress() && deleteStatusEffectAll(nodeId);
  }
  afterEventLoop(() => {
    if (!nodeDivRef.current || !nodeDivRef) return;
    applyStyle(); // applies base style which is then layered with the other styles/effects in the app
    // similar to photoshop or premiere or any layering app
    handleProgressStatusEffects();
    loaded && applyElementEffects(nodeId);
  });

  return { style };
}

export function useNodeHandleEvents(
  nodeDivRef: React.MutableRefObject<HTMLDivElement | null>,
  nodeId: string,
  loaded: boolean
) {
  useLayoutEffect(() => {
    if (!loaded) return;
    // when dragging ends the translate needs to be reset just before the next render of the node
    if (nodeDivRef && nodeDivRef.current) {
      getSortedBeforeRenderEvents(nodeId)();
    }
  });
}
